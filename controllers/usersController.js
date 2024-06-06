const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../sequelize');

// Função para registrar o usuário
exports.signup = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria o usuário
        const user = await User.create({
            username,
            password: hashedPassword,
            email
        });

        // Gera um token JWT
        const token = jwt.sign({ user_id: user.user_id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        res.status(201).json({ user, token });
    } catch (err) {
        console.error('Erro ao registrar usuário:', err);
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};

// Função para logar o usuário
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica se o usuário existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Email ou senha incorretos.' });
        }

        // Verifica se a senha está correta
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Email ou senha incorretos.' });
        }

        // Gera um token JWT
        const token = jwt.sign({ user_id: user.user_id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        res.json({ user, token });
    } catch (err) {
        console.error('Erro ao logar usuário:', err);
        res.status(500).json({ error: 'Erro ao logar usuário' });
    }
};
