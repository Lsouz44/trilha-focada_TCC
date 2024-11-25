const express = require("express");
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

app.post("/new-activity", authenticateToken, async (req, res) => {
    const activityName = req.body.activityName;
    const priority = req.body.priority;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const days = req.body.days;
    const userId = req.user.userId;

    try {
        await db.query(
            "INSERT INTO banco.activity (activity_name, priority, start_time, end_time, idusuario, days) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [activityName, priority, startTime, endTime, userId, days]
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
            "SELECT days FROM banco.activity WHERE idusuario = $1",
            [userId]
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
        'SELECT idactivity, activity_name, priority, start_time, end_time, days FROM banco.activity WHERE idusuario = $1 ORDER BY days[1] ASC',
        [userId]
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
      const result = await db.query('SELECT * FROM banco.activity WHERE idactivity = $1', [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).send({ msg: "Atividade não encontrada" });
      }
  
      res.status(200).send(result.rows[0]);
    } catch (error) {
      console.error('Erro ao buscar atividade:', error);
      res.status(500).send({ msg: "Erro ao buscar atividade" });
    }
  });

app.delete('/delete-activity/:id', authenticateToken, async (req, res) => {
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
        'DELETE FROM banco.activity WHERE idactivity = $1',
        [activityId]
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
        const pendingRequest = await db.query(
            "SELECT * FROM banco.usuarios_relacionamentos WHERE id_acompanhante = $1 AND status = 'pendente'",
            [userId]
        );

        return res.send({ success: true, notifications: pendingRequest.rows });
    } catch (error) {
        console.error('Erro ao buscar notificações:', error);
        return res.status(500).send({ success: false, message: 'Erro ao buscar notificações.' });
    }
});

app.get("/user-companion", authenticateToken, async (req, res) => {
    const userId = req.user.userId;
  
    try {
      const result = await db.query(`
        SELECT u.name, ur.id_acompanhante
        FROM banco.usuarios_relacionamentos ur
        JOIN banco.usuarios u ON u.idusuarios = ur.id_acompanhante
        WHERE ur.id_usuario = $1 AND ur.status = 'aceito'
      `, [userId]);
  
      if (result.rows.length === 0) {
        return res.send({ success: false, msg: "Acompanhante não encontrado." });
      }
  
      res.send({ success: true, companion: result.rows[0] });
    } catch (error) {
      console.error("Erro ao buscar acompanhante:", error);
      res.status(500).json({ success: false, message: "Erro ao buscar acompanhante." });
    }
  });

app.listen(3001, () => {
    console.log("Rodando na porta 3001");
});

module.exports = authenticateToken;