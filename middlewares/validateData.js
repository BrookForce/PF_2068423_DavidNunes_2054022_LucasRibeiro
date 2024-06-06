const validateTweetData = (req, res, next) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ error: 'Conteúdo do tweet é obrigatório.' });
    }
    next();
};

const validateUserData = (req, res, next) => {
    const { username, password, email } = req.body;
    if (req.path === '/login') {
        if (!email || !password) {
            return res.status(400).json({ error: 'Email e password são obrigatórios.' });
        }
    } else {
        if (!username || !password || !email) {
            return res.status(400).json({ error: 'Username, email e password são obrigatórios.' });
        }
    }
    next();
};

module.exports = {
    validateTweetData,
    validateUserData
};
