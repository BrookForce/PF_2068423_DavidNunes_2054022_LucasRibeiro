const { Follow } = require('../sequelize');

// Seguir usuário
exports.followUser = async (req, res) => {
    const follower_id = req.user.user_id;
    const { following_id } = req.body;

    try {
        const follow = await Follow.create({ follower_id, following_id });
        res.status(201).json(follow);
    } catch (err) {
        console.error('Erro ao seguir usuário:', err);
        res.status(500).json({ error: 'Erro ao seguir usuário' });
    }
};

// Parar de seguir usuário
exports.unfollowUser = async (req, res) => {
    const follower_id = req.user.user_id;
    const { following_id } = req.body;

    try {
        const follow = await Follow.destroy({
            where: {
                follower_id,
                following_id
            }
        });

        if (follow) {
            res.status(200).json({ message: 'Deixou de seguir usuário com sucesso' });
        } else {
            res.status(404).json({ error: 'Follow não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao deixar de seguir usuário:', err);
        res.status(500).json({ error: 'Erro ao deixar de seguir usuário' });
    }
};
