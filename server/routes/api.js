const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    createActivity,
    getActivities,
    updateActivity,
    deleteActivity,
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal,
    notifyCompanion,
} = require('../controllers/apiController');

// Autenticação
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

// Atividades
router.post('/activities', createActivity);
router.get('/activities', getActivities);
router.put('/activities/:id', updateActivity);
router.delete('/activities/:id', deleteActivity);

// Objetivos e Metas
router.post('/goals', createGoal);
router.get('/goals', getGoals);
router.put('/goals/:id', updateGoal);
router.delete('/goals/:id', deleteGoal);

// Companheiro
router.post('/companion/notify', notifyCompanion);

module.exports = router;