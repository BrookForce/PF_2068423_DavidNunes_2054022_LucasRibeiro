const { Tweet, User, Like } = require('../sequelize');

exports.createTweet = async (req, res) => {
    const { content } = req.body;
    const user_id = req.user.user_id;

    try {
        const tweet = await Tweet.create({ content, user_id });
        res.status(201).json(tweet);
    } catch (err) {
        console.error('Erro ao criar tweet:', err);
        res.status(500).json({ error: 'Erro ao criar tweet' });
    }
};

exports.createTweetWithImage = async (req, res) => {
    const { content } = req.body;
    const user_id = req.user.user_id;
    const image = req.file ? req.file.filename : null;

    try {
        const tweet = await Tweet.create({ content, user_id, image });
        res.status(201).json(tweet);
    } catch (err) {
        console.error('Erro ao criar tweet com imagem:', err);
        res.status(500).json({ error: 'Erro ao criar tweet com imagem' });
    }
};

exports.getUserTweets = async (req, res) => {
    const { user_id } = req.params;

    try {
        const tweets = await Tweet.findAll({ 
            where: { user_id }, 
            include: [{ model: User, as: 'user', attributes: ['username'] }] 
        });
        res.status(200).json(tweets);
    } catch (err) {
        console.error('Erro ao obter tweets do usuário:', err);
        res.status(500).json({ error: 'Erro ao obter tweets do usuário' });
    }
};

exports.likeTweet = async (req, res) => {
    const { tweet_id } = req.body;
    const user_id = req.user.user_id;

    try {
        const like = await Like.create({ tweet_id, user_id });
        res.status(201).json(like);
    } catch (err) {
        console.error('Erro ao gostar do tweet:', err);
        res.status(500).json({ error: 'Erro ao gostar do tweet' });
    }
};

exports.unlikeTweet = async (req, res) => {
    const { tweet_id } = req.body;
    const user_id = req.user.user_id;

    try {
        const result = await Like.destroy({ where: { tweet_id, user_id } });
        if (result) {
            res.status(200).json({ message: 'Desgostou do tweet com sucesso' });
        } else {
            res.status(404).json({ error: 'Like não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao desgostar do tweet:', err);
        res.status(500).json({ error: 'Erro ao desgostar do tweet' });
    }
};
