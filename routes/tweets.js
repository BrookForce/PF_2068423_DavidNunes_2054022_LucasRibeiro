const express = require('express');
const router = express.Router();
const tweetsController = require('../controllers/tweetsController');
const { validateTweetData } = require('../middlewares/validateData');
const authenticateTokenFromHeaders = require('../middlewares/authenticateToken');
const upload = require('../middlewares/upload');


router.use(authenticateTokenFromHeaders);

/**
 * @swagger
 * /tweets:
 *   post:
 *     summary: Criar um novo tweet
 *     tags: [Tweets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Este é um novo tweet"
 *     responses:
 *       201:
 *         description: Tweet criado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post('/', validateTweetData, tweetsController.createTweet);

/**
 * @swagger
 * /tweets/image:
 *   post:
 *     summary: Criar um novo tweet com imagem
 *     tags: [Tweets]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Este é um novo tweet com imagem"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Tweet com imagem criado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post('/image', upload.single('image'), tweetsController.createTweetWithImage);

/**
 * @swagger
 * /tweets/{user_id}:
 *   get:
 *     summary: Obter todos os tweets de um utilizador específico
 *     tags: [Tweets]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do utilizador
 *     responses:
 *       200:
 *         description: Lista de tweets do utilizador
 *       400:
 *         description: Erro na requisição
 */
router.get('/:user_id', tweetsController.getUserTweets);

module.exports = router;
