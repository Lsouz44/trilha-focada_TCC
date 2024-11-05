const User = require('../models/User');
const Activity = require('../models/Activity');
const Goal = require('../models/Goal');
const Companion = require('../models/Companion');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Autenticação
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ status: 'success', data: user });
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret'); // use uma chave secreta segura
        res.json({ status: 'success', token });
    } else {
        res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }
};

// Atividades
exports.createActivity = async (req, res) => {
    const { title, description, dueDate } = req.body;
    const activity = await Activity.create({ title, description, dueDate });
    res.status(201).json({ status: 'success', data: activity });
};

exports.getActivities = async (req, res) => {
    const activities = await Activity.findAll();
    res.json({ status: 'success', data: activities });
};

exports.updateActivity = async (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate, status } = req.body;
    await Activity.update({ title, description, dueDate, status }, { where: { id } });
    res.json({ status: 'success', message: 'Activity updated' });
};

exports.deleteActivity = async (req, res) => {
    const { id } = req.params;
    await Activity.destroy({ where: { id } });
    res.json({ status: 'success', message: 'Activity deleted' });
};

// Objetivos e Metas
exports.createGoal = async (req, res) => {
    const { title, description, targetDate } = req.body;
    const goal = await Goal.create({ title, description, targetDate });
    res.status(201).json({ status: 'success', data: goal });
};

exports.getGoals = async (req, res) => {
    const goals = await Goal.findAll();
    res.json({ status: 'success', data: goals });
};

exports.updateGoal = async (req, res) => {
    const { id } = req.params;
    const { title, description, targetDate, status } = req.body;
    await Goal.update({ title, description, targetDate, status }, { where: { id } });
    res.json({ status: 'success', message: 'Goal updated' });
};

exports.deleteGoal = async (req, res) => {
    const { id } = req.params;
    await Goal.destroy({ where: { id } });
    res.json({ status: 'success', message: 'Goal deleted' });
};

// Companheiro
exports.notifyCompanion = async (req, res) => {
    const { companionId, message } = req.body;
    // Lógica para enviar a notificação
    res.json({ status: 'success', message: `Notification sent to companion ${companionId}` });
};
