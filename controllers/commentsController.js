const { Comment } = require('../sequelize');


exports.createComment = async (req, res) => {
    const { content, tweet_id } = req.body;
    const user_id = req.user.user_id;

    try {
        const comment = await Comment.create({ content, tweet_id, user_id });
        res.status(201).json(comment);
    } catch (err) {
        console.error('Erro ao criar comentário:', err);
        res.status(500).json({ error: 'Erro ao criar comentário' });
    }
};


exports.getCommentsByTweet = async (req, res) => {
    const tweet_id = req.params.tweet_id;

    try {
        const comments = await Comment.findAll({ where: { tweet_id } });
        res.status(200).json(comments);
    } catch (err) {
        console.error('Erro ao obter comentários:', err);
        res.status(500).json({ error: 'Erro ao obter comentários' });
    }
};


exports.deleteComment = async (req, res) => {
    const comment_id = req.params.comment_id;

    try {
        const comment = await Comment.findByPk(comment_id);
        if (comment) {
            await comment.destroy();
            res.status(200).json({ message: 'Comentário deletado com sucesso' });
        } else {
            res.status(404).json({ error: 'Comentário não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao deletar comentário:', err);
        res.status(500).json({ error: 'Erro ao deletar comentário' });
    }
};
