const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
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

app.post("/register", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const checkUser = await db.query("SELECT * FROM banco.usuarios WHERE email = $1", [email]);
       
        if (checkUser.rows.length === 0){
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                const insertUser = await db.query("INSERT INTO banco.usuarios (email, password) VALUES ($1, $2) RETURNING *", [email, hash]);
                
                res.send({ msg: "Cadastrado com sucesso!", user: insertUser.rows[0] });
            })
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
                if (err) {
                    return res.status(500).send({ msg: "Erro ao verificar a senha" });
                }

                if (result){
                    res.send({ msg: "Login feito com sucesso!" });    
                } else {
                    res.send({ msg: "Senha incorreta" });
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

app.listen(3001, () => {
    console.log("Rodando na porta 3001");
});