const express = require('express');
const sequelize = require('./config/sequelize');
const apiRoutes = require('./routes/api');
const User = require('./models/User');
const Activity = require('./models/Activity');
const Goal = require('./models/Goal');
const Companion = require('./models/Companion');

const app = express();
app.use(express.json()); // para analisar JSON no corpo das requisições

// Usando as rotas da API
app.use('/api', apiRoutes);

// Sincronizando modelos e inicializando o servidor
const startServer = async () => {
    try {
        await sequelize.sync(); // Sincroniza com o banco de dados
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    } catch (error) {
        console.error('Error syncing models:', error);
    }
};

startServer();
