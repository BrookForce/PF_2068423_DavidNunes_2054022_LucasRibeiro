const { Like } = require('../sequelize');

// Gostar de um tweet
exports.likeTweet = (req, res, next) => {
    const { tweet_id } = req.body;
    const user_id = req.user.user_id;

    Like.create({ tweet_id, user_id })
        .then(like => {
            res.status(201).json(like);
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
};

// Desgostar de um tweet
exports.unlikeTweet = (req, res, next) => {
    const { tweet_id } = req.body;
    const user_id = req.user.user_id;

    Like.destroy({ where: { tweet_id, user_id } })
        .then(() => {
            res.status(200).json({ message: 'Like removed' });
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
};
