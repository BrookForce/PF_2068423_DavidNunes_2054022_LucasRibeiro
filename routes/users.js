const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { validateUserData } = require('../middlewares/validateData');

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Registar um novo utilizador
 *     tags: [Utilizadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "usuario123"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *     responses:
 *       201:
 *         description: Utilizador criado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post('/signup', validateUserData, usersController.signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sessão de um utilizador
 *     tags: [Utilizadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Sessão iniciada com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post('/login', validateUserData, usersController.login);

module.exports = router;
