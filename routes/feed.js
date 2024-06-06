const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');
const authenticateTokenFromHeaders = require('../middlewares/authenticateToken');

/**
 * @swagger
 * /feed:
 *   get:
 *     summary: Obter o feed de tweets
 *     tags: [Feed]
 *     responses:
 *       200:
 *         description: Lista de tweets no feed
 *       400:
 *         description: Erro na requisição
 */
router.get('/', authenticateTokenFromHeaders, feedController.getFeed);

module.exports = router;
