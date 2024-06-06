const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../sequelize');


exports.signup = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const user = await User.create({
            username,
            password: hashedPassword,
            email
        });

       
        const token = jwt.sign({ user_id: user.user_id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        res.status(201).json({ user, token });
    } catch (err) {
        console.error('Erro ao registrar usuário:', err);
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Email ou senha incorretos.' });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Email ou senha incorretos.' });
        }

        
        const token = jwt.sign({ user_id: user.user_id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        res.json({ user, token });
    } catch (err) {
        console.error('Erro ao logar usuário:', err);
        res.status(500).json({ error: 'Erro ao logar usuário' });
    }
};
