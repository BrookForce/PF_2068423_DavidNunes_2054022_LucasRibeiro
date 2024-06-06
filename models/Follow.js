module.exports = (sequelize, type) => {
    return sequelize.define('Follow', {
        follower_id: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'user_id'
            },
            onDelete: 'CASCADE'
        },
        following_id: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'user_id'
            },
            onDelete: 'CASCADE'
        }
    }, {
        tableName: 'Follows',
        timestamps: true
    });
};
