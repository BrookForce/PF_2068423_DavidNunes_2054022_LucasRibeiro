const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const authenticateTokenFromHeaders = require('../middlewares/authenticateToken');


router.use(authenticateTokenFromHeaders);

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Adicionar um comentário a um tweet
 *     tags: [Comentários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Este é um comentário"
 *               tweet_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Comentário criado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post('/', commentsController.createComment);

/**
 * @swagger
 * /comments/{tweet_id}:
 *   get:
 *     summary: Obter todos os comentários de um tweet específico
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: tweet_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do tweet
 *     responses:
 *       200:
 *         description: Lista de comentários do tweet
 *       400:
 *         description: Erro na requisição
 */
router.get('/:tweet_id', commentsController.getCommentsByTweet);

/**
 * @swagger
 * /comments/{comment_id}:
 *   delete:
 *     summary: Deletar um comentário
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do comentário
 *     responses:
 *       200:
 *         description: Comentário deletado com sucesso
 *       404:
 *         description: Comentário não encontrado
 *       400:
 *         description: Erro na requisição
 */
router.delete('/:comment_id', commentsController.deleteComment);

module.exports = router;
