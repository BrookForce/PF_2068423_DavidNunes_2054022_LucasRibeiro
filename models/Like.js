module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
        like_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tweet_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'Likes',
        timestamps: true
    });

    return Like;
};
