const { Tweet, User, Like, Comment } = require('../sequelize');

exports.getFeed = async (req, res) => {
    try {
        const userId = req.user.id;

        // Obtenha todos os tweets dos usuários seguidos pelo usuário atual
        const tweets = await Tweet.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['username']
                },
                {
                    model: Like,
                    as: 'likes',
                    attributes: ['user_id']
                },
                {
                    model: Comment,
                    as: 'comments',
                    attributes: ['content', 'user_id'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['username']
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(tweets);
    } catch (error) {
        console.error('Erro ao obter feed:', error);
        res.status(500).json({ error: 'Erro ao obter feed' });
    }
};
