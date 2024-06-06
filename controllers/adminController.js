const { User, Tweet } = require('../sequelize');

// Gestão de usuários
exports.getAllUsers = (req, res, next) => {
    User.findAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
};

exports.updateUser = (req, res, next) => {
    const userId = req.params.user_id;
    const updates = req.body;

    User.update(updates, { where: { user_id: userId } })
        .then(() => {
            res.status(200).json({ message: 'User updated successfully' });
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
};

exports.deleteUser = (req, res, next) => {
    const userId = req.params.user_id;

    User.destroy({ where: { user_id: userId } })
        .then(() => {
            res.status(200).json({ message: 'User deleted successfully' });
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
};

// Gestão de tweets
exports.getAllTweets = (req, res, next) => {
    Tweet.findAll()
        .then(tweets => {
            res.status(200).json(tweets);
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
};

exports.updateTweet = (req, res, next) => {
    const tweetId = req.params.tweet_id;
    const updates = req.body;

    Tweet.update(updates, { where: { tweet_id: tweetId } })
        .then(() => {
            res.status(200).json({ message: 'Tweet updated successfully' });
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
};

exports.deleteTweet = (req, res, next) => {
    const tweetId = req.params.tweet_id;

    Tweet.destroy({ where: { tweet_id: tweetId } })
        .then(() => {
            res.status(200).json({ message: 'Tweet deleted successfully' });
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
};
