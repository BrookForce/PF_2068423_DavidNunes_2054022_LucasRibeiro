const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likesController');
const authenticateTokenFromHeaders = require('../middlewares/authenticateToken');

// Middleware para autenticar o token JWT
router.use(authenticateTokenFromHeaders);

/**
 * @swagger
 * /likes:
 *   post:
 *     summary: Gostar de um tweet
 *     tags: [Gostos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tweet_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Gostou do tweet com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post('/', likesController.likeTweet);

/**
 * @swagger
 * /likes:
 *   delete:
 *     summary: Desgostar de um tweet
 *     tags: [Gostos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tweet_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Deixou de gostar do tweet com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.delete('/', likesController.unlikeTweet);

module.exports = router;
