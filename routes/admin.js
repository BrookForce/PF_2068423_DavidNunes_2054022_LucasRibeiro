const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateTokenFromHeaders = require('../middlewares/authenticateToken');


router.use(authenticateTokenFromHeaders);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Obter todos os utilizadores
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de utilizadores
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Não autorizado
 */
router.get('/users', adminController.getAllUsers);

/**
 * @swagger
 * /admin/users/{user_id}:
 *   put:
 *     summary: Atualizar um utilizador
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do utilizador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "novo_nome_utilizador"
 *     responses:
 *       200:
 *         description: Utilizador atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.put('/users/:user_id', adminController.updateUser);

/**
 * @swagger
 * /admin/users/{user_id}:
 *   delete:
 *     summary: Excluir um utilizador
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do utilizador
 *     responses:
 *       200:
 *         description: Utilizador excluído com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.delete('/users/:user_id', adminController.deleteUser);

/**
 * @swagger
 * /admin/tweets:
 *   get:
 *     summary: Obter todos os tweets
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Lista de tweets
 *       400:
 *         description: Erro na requisição
 */
router.get('/tweets', adminController.getAllTweets);

/**
 * @swagger
 * /admin/tweets/{tweet_id}:
 *   put:
 *     summary: Atualizar um tweet
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: tweet_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do tweet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Conteúdo atualizado do tweet"
 *     responses:
 *       200:
 *         description: Tweet atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.put('/tweets/:tweet_id', adminController.updateTweet);

/**
 * @swagger
 * /admin/tweets/{tweet_id}:
 *   delete:
 *     summary: Excluir um tweet
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: tweet_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do tweet
 *     responses:
 *       200:
 *         description: Tweet excluído com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.delete('/tweets/:tweet_id', adminController.deleteTweet);

module.exports = router;
