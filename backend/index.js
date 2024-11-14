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
    const userId = req.user.userId;
    // const selectedDays = req.body.selectedDays;

    try {
        await db.query(
            "INSERT INTO banco.activity (activity_name, priority, start_time, end_time, idusuario) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [activityName, priority, startTime, endTime, userId]
        );
        res.send({ msg: "Atividade cadastrada com sucesso!" });
    } catch (err) {
        console.error("Erro ao cadastrar atividades:", err);
        res.status(500).send("Erro ao cadastrar atividades");
    }
});

app.listen(3001, () => {
    console.log("Rodando na porta 3001");
});

module.exports = authenticateToken;