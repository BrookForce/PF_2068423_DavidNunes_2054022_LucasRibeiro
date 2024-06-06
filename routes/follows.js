const express = require('express');
const router = express.Router();
const followsController = require('../controllers/followsController');
const authenticateTokenFromHeaders = require('../middlewares/authenticateToken');

// Middleware para autenticar o token JWT
router.use(authenticateTokenFromHeaders);

/**
 * @swagger
 * /follows:
 *   post:
 *     summary: Seguir um utilizador
 *     tags: [Seguir]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               following_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Seguindo utilizador com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post('/', followsController.followUser);

/**
 * @swagger
 * /follows:
 *   delete:
 *     summary: Parar de seguir um utilizador
 *     tags: [Seguir]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               following_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Deixou de seguir utilizador com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.delete('/', followsController.unfollowUser);

module.exports = router;
