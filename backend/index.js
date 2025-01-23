const express = require("express");
const multer = require('multer');
const path = require('path');
const { Pool } = require("pg");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const app = express();

const db = new Pool({
    host: "localhost",
    user: "postgres",
    password: "cascata00",
    database: "bd_trilhafocada",
    port: 5432,
});

// Configuração do Multer para salvar o avatar na pasta "uploads/avatars"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/avatars'); // Caminho onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Nome único para o arquivo
    }
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send("Token não fornecido");

    jwt.verify(token, 'secretyourkey', (err, decoded) => {
        if (err) return res.status(403).send("Token inválido");

        // Adicione o userId ao req para acesso nas rotas
        req.user = { userId: decoded.userId };
        next();
    });
}

app.post("/register", async (req, res) => {
    const name = req.body.name;
    const type = req.body.type;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const checkUser = await db.query("SELECT * FROM banco.usuarios WHERE email = $1", [email]);
       
        if (checkUser.rows.length === 0){
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.error("Erro ao hashear senha:", err);
                    return res.status(500).send({ msg: "Erro interno no servidor" });
                } 

            const insertUser = await db.query("INSERT INTO banco.usuarios (name, type, email, password) VALUES ($1, $2, $3, $4) RETURNING *", [name, type, email, hash]);
                
            res.send({ msg: "Cadastrado com sucesso!", user: insertUser.rows[0] });
        });
        } else {
            res.send({msg: "Usuário já cadastrado"});
        }
    } catch (err) {
        console.error("Erro ao cadastrar usuário:", err);
        res.status(500).send(err);
    }
});

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const checkUserLogin = await db.query("SELECT * FROM banco.usuarios WHERE email = $1", [email]);
        
        if (checkUserLogin.rows.length > 0){
            bcrypt.compare(password, checkUserLogin.rows[0].password, (err, result) => {
                if (result){
                    const token = jwt.sign({ userId: checkUserLogin.rows[0].idusuarios }, 'secretyourkey', { expiresIn: '3h' });
                    res.send({ msg: "Login feito com sucesso!", result, token }); 
                } else {
                    res.send({ msg: "Senha incorreta", result });
                }
            });
        } else {
            res.send({ msg: "Não foi possível encontrar sua conta" });
        }
    } catch (err) {
        console.error("Erro ao fazer login:", err);
        res.status(500).send(err);
    }
});

app.get('/home', authenticateToken, async (req, res) => {
    const userId = req.user.userId; // userId extraído do token

    try {
        // Verifica o tipo de usuário
        const userResult = await db.query(
            'SELECT type FROM banco.usuarios WHERE idusuarios = $1',
            [userId]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).send({ error: 'Usuário não encontrado' });
        }

        const userType = userResult.rows[0].type;

        if (userType === '2') {
            // Verifica se o usuário do tipo 2 é acompanhante de algum usuário do tipo 1
            const relationshipResult = await db.query(
                'SELECT idusuario FROM banco.usuarios_relacionamentos WHERE idacompanhante = $1',
                [userId]
            );

            if (relationshipResult.rows.length === 0) {
                return res.status(400).send({ error: 'Você não está vinculado a nenhum usuário como acompanhante' });
            }

            const companionId = relationshipResult.rows[0].idusuario;

            // Busca dados do usuário acompanhado
            const companionData = await db.query(
                'SELECT name FROM banco.usuarios WHERE idusuarios = $1',
                [companionId]
            );

            const activities = await db.query(
                'SELECT * FROM banco.activity WHERE idusuario = $1',
                [companionId]
            );

            return res.status(200).send({
                type: 'accompanist',
                companion: companionData.rows[0],
                activities: activities.rows,
            });
        } else {
            // Usuário normal, retornar suas atividades
            const activities = await db.query(
                'SELECT * FROM banco.activity WHERE idusuario = $1',
                [userId]
            );

            return res.status(200).send({type: 'normal', activities: activities.rows,});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error fetching home data'});
    }
});

app.post("/new-activity", authenticateToken, async (req, res) => {
    const activityName = req.body.activityName;
    const priority = req.body.priority;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const days = req.body.days;
    const userId = req.user.userId;

    try {
        await db.query(
            "INSERT INTO banco.activity (activity_name, priority, start_time, end_time, idusuario, days, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [activityName, priority, startTime, endTime, userId, days, 'active']
        );
        res.send({ msg: "Atividade cadastrada com sucesso!" });
    } catch (err) {
        console.error("Erro ao cadastrar atividades:", err);
        res.status(500).send("Erro ao cadastrar atividades");
    }
});

app.get("/days-activities", authenticateToken, async (req, res) => {
    const userId = req.user.userId;

    try {
        const result = await db.query(
            "SELECT days FROM banco.activity WHERE idusuario = $1 AND status = $2",
            [userId, 'active']
        );

        const activities = result.rows.map((row) => row.days);
        res.json({ activities });
    } catch (err) {
        console.error("Erro ao buscar atividades:", err);
        res.status(500).send("Erro ao buscar atividades");
    }
});

app.get('/feed-activities', authenticateToken, async (req, res) => {
    const userId = req.user.userId; // ID do usuário autenticado
  
    try {
      const activities = await db.query(
        'SELECT idactivity, activity_name, priority, start_time, end_time, days FROM banco.activity WHERE idusuario = $1 AND status = $2 ORDER BY days[1] ASC',
        [userId, 'active']
      );
      res.json(activities.rows);
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
      res.status(500).json({ error: 'Erro ao buscar atividades.' });
    }
  });

app.get('/activity/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
  
    if (!id || isNaN(id)) {
      return res.status(400).send({ msg: "ID inválido" });
    }
  
    try {
      const result = await db.query('SELECT * FROM banco.activity WHERE idactivity = $1 AND status = $2', [id, 'active']);
  
      if (result.rows.length === 0) {
        return res.status(404).send({ msg: "Atividade não encontrada" });
      }
  
      res.status(200).send(result.rows[0]);
    } catch (error) {
      console.error('Erro ao buscar atividade:', error);
      res.status(500).send({ msg: "Erro ao buscar atividade" });
    }
  });

app.put('/activity/:id/complete', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const activityId = parseInt(id, 10);

    if (!id) {
        return res.status(400).send({ msg: "ID da atividade não fornecido" });
    }

    if (isNaN(activityId)) {
        return res.status(400).send({ msg: "ID da atividade inválido" });
    }

    try {
        const result = await db.query(
            'UPDATE banco.activity SET status = $1 WHERE idactivity = $2 AND status = $3',
            ['completed', activityId, 'active']
        );

        if (result.rowCount === 0) {
            return res.status(404).send({ msg: "Atividade não encontrada ou já concluída." });
        }

        res.status(200).send({ msg: "Atividade concluída com sucesso!" });
    } catch (error) {
        console.error('Erro ao marcar atividade como concluída:', error);
        res.status(500).json({ error: 'Erro ao marcar atividade como concluída.' });
    }
});

app.put('/activity/:id/delete', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const activityId = parseInt(id, 10);

    if (!id) {
        return res.status(400).send({ msg: "ID não fornecido" });
    }

    if (isNaN(activityId)) {
        return res.status(400).send({ msg: "ID inválido" });
    }

    try {
        await db.query(
        'UPDATE banco.activity SET status = $1 WHERE idactivity = $2',
        ['deleted', activityId]
        );
        res.status(200).send({ msg: "Atividade excluída com sucesso!" });
    } catch (error) {
        console.error('Erro ao excluir atividade:', error);
        res.status(500).json({ error: 'Erro ao excluir atividade.' });
    }
});  

app.put('/update-activity/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const activityId = parseInt(id, 10);

    if (!id) {
        return res.status(400).send({ msg: "ID não fornecido" });
    }

    if (isNaN(activityId)) {
        return res.status(400).send({ msg: "ID inválido" });
    }

    const { activityName, priority, startTime, endTime, days } = req.body;

    try {
        await db.query(
            `UPDATE banco.activity SET activity_name = $1, priority = $2, start_time = $3, end_time = $4, days = $5 WHERE idactivity = $6`,
            [activityName, priority, startTime, endTime, days, activityId]
        );
        res.status(200).send({ msg: "Atividade atualizada com sucesso!" });
    } catch (error) {
        console.error("Erro ao atualizar atividade:", error);
        res.status(500).send({ msg: "Erro ao atualizar atividade." });
    }
});

app.post('/send-invite', authenticateToken, async (req, res) => {
    const emailInvite = req.body.emailInvite;
    const userId = req.user.userId;

    try {
        // Verificar se o usuário está tentando enviar convite para ele mesmo
        // if (userId === notificationId) {
        //     return res.send({
        //     success: false,
        //     message: 'Você não pode enviar um convite para si mesmo.',
        //     });
        // }

        // Verifica se o acompanhante existe
        const acompanhante = await db.query(
            "SELECT * FROM banco.usuarios WHERE email = $1 AND type = $2",
            [emailInvite, 2]
        );

        if (!acompanhante.rows || acompanhante.rows.length === 0) {
            return res.send({ sucess: false, msg: "Acompanhante não encontrado" });
        }

        // Verifica se já existe um vínculo pendente entre o usuário normal e o acompanhante
        const acompanhanteId = acompanhante.rows[0].idusuarios
        const existingresult = await db.query(
            "SELECT * FROM banco.usuarios_relacionamentos WHERE id_usuario = $1 AND id_acompanhante = $2 AND status = 'pendente'",
            [userId, acompanhanteId]);

        if (existingresult.rows.length > 0) {
            return res.send({ success: false, msg: 'Convite já enviado para este acompanhante' });
        }
        
        if (userId === acompanhanteId) {
            return res.send({ sucess: false, msg: "Você não pode enviar um convite para si mesmo." });
        }

        await db.query(
            "INSERT INTO banco.usuarios_relacionamentos (id_usuario, id_acompanhante, status) VALUES ($1, $2, 'pendente')",
            [userId, acompanhanteId]
        );

        res.send({ success: true, msg: 'Convite enviado com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar convite:', error);
        res.status(500).send({ success: false, msg: 'Erro ao enviar convite' });
    }
});

app.post('/accept-invite', authenticateToken, async (req, res) => {
    const acompanhanteId = req.body.acompanhanteId;
    const notificationId = req.body.notificationId;
    const userId = req.user.userId;
    
    try {
        // Verifica se a solicitação de vínculo existe e está pendente
        const result = await db.query(
            "SELECT * FROM banco.usuarios_relacionamentos WHERE id_usuario = $1 AND id_acompanhante = $2 AND status = 'pendente'",
            [userId, acompanhanteId]);
        
        if (!result) {
            return res.send({ success: false, msg: 'Solicitação não encontrada ou já processada' });
        }

        // Atualiza o status para 'aceito'
        await db.query(
            "UPDATE banco.usuarios_relacionamentos SET status = $1 WHERE id = $2 RETURNING *",
            ['aceito', notificationId]
        );

        return res.send({ success: true, msg: 'Vínculo confirmado com sucesso!' });
    } catch (error) {
        console.erro('Erro ao aceitar convite:', error);
        return res.status(500).send({ success: false, msg: 'Erro ao aceitar convite' });
    }
});

app.post('/reject-invite', authenticateToken, async (req, res) => {
    const acompanhanteId = req.body.acompanhanteId;
    const notificationId = req.body.notificationId;
    const userId = req.user.userId;

    try {
        // Verifica se a solicitação de vínculo existe e está pendente
        const result = await db.query(
            "SELECT * FROM banco.usuarios_relacionamentos WHERE id_usuario = $1 AND id_acompanhante = $2 AND status = 'pendente'",
            [userId, acompanhanteId]);
        
        if (!result) {
            return res.status(404).send({ success: false, msg: 'Solicitação não encontrada ou já processada' });
        }

        // Atualiza o status para 'recusado'
        await db.query(
            "DELETE FROM banco.usuarios_relacionamentos WHERE id = $1 RETURNING *",
            [notificationId]
        );

        return res.status(200).send({ success: true, msg: 'Solicitação recusada' });
    } catch (error) {
        console.erro('Erro ao recusar convite:', error);
        return res.status(500).send({ success: false, message: 'Erro ao recusar convite' });
    }
});

app.get('/notifications', authenticateToken, async (req, res) => {
    const userId = req.user.userId;

    try {
        // Buscar notificações relacionadas ao usuário
        const pendingRequest = await db.query(
            `SELECT 
                ur.id, 
                ur.id_usuario, 
                ur.id_acompanhante, 
                ur.status, 
                u.name AS usuario_name 
            FROM banco.usuarios_relacionamentos ur
            JOIN banco.usuarios u 
            ON ur.id_usuario = u.idusuarios
            WHERE ur.id_acompanhante = $1 AND ur.status = 'pendente'`,
            [userId]
        );

        // Buscar o nome do usuário logado
        const userResult = await db.query(
            `SELECT name FROM banco.usuarios WHERE idusuarios = $1`,
            [userId]
        );

        const loggedUserName = userResult.rows[0]?.name || 'Usuário';

        return res.send({ success: true, notifications: pendingRequest.rows, loggedUserName });
    } catch (error) {
        console.error('Erro ao buscar notificações:', error);
        return res.status(500).send({ success: false, message: 'Erro ao buscar notificações.' });
    }
});

app.get("/user-companion", authenticateToken, async (req, res) => {
    const userId = req.user.userId;
  
    try {
      const result = await db.query(`
        SELECT u.name, u.avatar, u.phone, u.email, ur.id_acompanhante, ur.status, ur.status_companion
        FROM banco.usuarios_relacionamentos ur
        JOIN banco.usuarios u ON u.idusuarios = ur.id_acompanhante
        WHERE ur.id_usuario = $1 AND ur.status = 'aceito' AND ur.status_companion = $2
      `, [userId, 'active']);
  
      if (result.rows.length === 0) {
        return res.send({ success: false, msg: "Acompanhante não encontrado." });
      }
  
      res.send({ success: true, companion: result.rows[0] });
    } catch (error) {
      console.error("Erro ao buscar acompanhante:", error);
      res.status(500).json({ success: false, message: "Erro ao buscar acompanhante." });
    }
  });

app.get('/profile', authenticateToken, async (req, res) => {
    const userId = req.user.userId;

    try {
        const user = await db.query(
            "SELECT idusuarios, name, email, phone, TO_CHAR(birth_date, 'YYYY-MM-DD') AS birth_date, avatar FROM banco.usuarios WHERE idusuarios = $1",
            [userId]
        );
        if (!user.rows.length) return res.status(404).send({ success: false, message: 'Usuário não encontrado.' });
        
        return res.send({ success: true, user: user.rows[0] });
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        return res.status(500).send({ success: false, message: 'Erro ao buscar perfil.' });
    }
});

app.put('/profile', authenticateToken, upload.single('avatar'), async (req, res) => {
    const userId = req.user.userId;
    const { name, phone, birth } = req.body;
    const avatar = req.file ? req.file.filename : null;

    console.log("Dados recebidos no backend:");
    console.log("name:", name);
    console.log("phone:", phone);
    console.log("birth:", birth);
    console.log("avatar:", avatar);

    try {
        console.log('Atualizando perfil para o usuário', userId);

        const queryParams = [name, phone, birth];
        let query = "UPDATE banco.usuarios SET name = $1, phone = $2, birth_date = $3";
        
        // Se o avatar foi enviado, adiciona ao comando SQL
        if (!avatar) {
            console.log("Atualizando avatar para:", avatar);
            query += ", avatar = $4";
            queryParams.push(avatar);
        } else {
            console.log("Atualizando avatar para:", avatar);
            query += ", avatar = $4";
            queryParams.push(avatar);
        } // ISSO AQUI NÃO ESTA FUNCIONANDO -> A FOTO EXCLUI E ADICIONA TODA VEZ QUE SALVA

        query += " WHERE idusuarios = $5 RETURNING *";
        queryParams.push(userId);

        console.log('Query executada:', query, queryParams); 

        // Atualiza os dados do usuário no banco
        await db.query(query, queryParams);

        return res.send({ success: true, msg: 'Perfil atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        return res.status(500).send({ success: false, message: 'Erro ao atualizar perfil.' });
    }
});

app.put('/user-companion/delete', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const { companionId } = req.body;

    if (!companionId) {
        return res.status(400).send({ success: false, message: 'ID do acompanhante é necessário.' });
    }

    try {
        const result = await db.query(
            "UPDATE banco.usuarios_relacionamentos SET status_companion = $1 WHERE id_usuario = $2 AND id_acompanhante = $3 AND status = 'aceito'",
            ['deleted', userId, companionId]
        );

        if (result.rowCount === 0) {
            return res.status(404).send({ success: false, message: 'Relacionamento não encontrado.' });
        }

        return res.send({ success: true, message: 'Acompanhante removido com sucesso.' });
    } catch (error) {
        console.error('Erro ao remover acompanhante:', error);
        return res.status(500).send({ success: false, message: 'Erro ao remover acompanhante.' });
    }
});

app.post('/reactions', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const { activity_id, reaction_type } = req.body;

    try {
        // Verifica se o usuário já reagiu à atividade
        const existingReaction = await db.query(
            'SELECT * FROM banco.reactions WHERE activity_id = $1 AND user_id = $2 AND reaction_type = $3',
            [activity_id, userId, reaction_type]
        );

        if (existingReaction.rows.length > 0) {
            // Remove a reação existente
            await db.query(
                'DELETE FROM banco.reactions WHERE activity_id = $1 AND user_id = $2 AND reaction_type = $3',
                [activity_id, userId, reaction_type]
            );
            return res.status(200).send({ message: 'Reaction removed successfully' });
        } else {
            // Verifica se o usuário reagiu com outro tipo de reação
            const otherReaction = await db.query(
                'SELECT * FROM banco.reactions WHERE activity_id = $1 AND user_id = $2',
                [activity_id, userId]
            );

            if (otherReaction.rows.length > 0) {
                // Atualiza a reação para o novo tipo
                await db.query(
                    'UPDATE banco.reactions SET reaction_type = $1 WHERE activity_id = $2 AND user_id = $3',
                    [reaction_type, activity_id, userId]
                );
                return res.status(200).send({ message: 'Reaction updated successfully' });
            } else {
                // Adiciona uma nova reação
                await db.query(
                    'INSERT INTO banco.reactions (activity_id, user_id, reaction_type) VALUES ($1, $2, $3)',
                    [activity_id, userId, reaction_type]
                );
                return res.status(201).send({ message: 'Reaction added successfully' });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error handling reaction' });
    }
});

app.get('/reactions', async (req, res) => {

    try {
        const result = await db.query(`
            SELECT 
                activity_id,
                SUM(CASE WHEN reaction_type = 'conquest' THEN 1 ELSE 0 END) AS conquest,
                SUM(CASE WHEN reaction_type = 'intime' THEN 1 ELSE 0 END) AS intime,
                SUM(CASE WHEN reaction_type = 'sad' THEN 1 ELSE 0 END) AS sad
            FROM banco.reactions
            GROUP BY activity_id;
        `);

        const reactions = result.rows;

        const groupedReactions = reactions.reduce((acc, reaction) => {
            acc[reaction.activity_id] = {
              conquest: reaction.conquest || 0,
              intime: reaction.intime || 0,
              sad: reaction.sad || 0,
            };
            return acc;
        }, {});

        res.status(200).json(groupedReactions);
    } catch (error) {
        console.error("Erro ao buscar reações agrupadas:", error);
        res.status(500).json({ error: "Error ao buscar reações agrupadas." });
    }
});  

app.put('/change-password', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await db.query("SELECT password FROM banco.usuarios WHERE idusuarios = $1", [userId]);
        if (!user.rows.length) return res.status(404).send({ success: false, message: 'Usuário não encontrado.' });

        const isMatch = await bcrypt.compare(oldPassword, user.rows[0].password);
        if (!isMatch) return res.status(400).send({ success: false, message: 'Senha antiga incorreta.' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.query("UPDATE banco.usuarios SET password = $1 WHERE idusuarios = $2", [hashedPassword, userId]);

        return res.send({ success: true, message: 'Senha alterada com sucesso.' });
    } catch (error) {
        console.error('Erro ao trocar senha:', error);
        return res.status(500).send({ success: false, message: 'Erro ao trocar senha.' });
    }
});

app.get('/dashboard/activities', authenticateToken, async (req, res) => {
    const userId = req.user.userId;

    try {
        const result = await db.query(
            'SELECT * FROM banco.activity WHERE idusuario = $1',
            [userId]
        );
        res.send({ success: true, activities: result.rows });
    } catch (error) {
        console.error('Erro ao buscar atividades:', error);
        res.status(500).send({ success: false, message: 'Erro ao buscar atividades.' });
    }
});


// Configurar a pasta estática para os avatares
app.use("/uploads/avatars", express.static(path.join(__dirname, "uploads/avatars")));

app.use("/uploads/avatars", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "image/png"); // ou "image/jpeg" dependendo do tipo de arquivo
    next();
  });

app.listen(3001, () => {
    console.log("Rodando na porta 3001");
});

module.exports = authenticateToken;