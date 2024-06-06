module.exports = (sequelize, DataTypes) => {
    const Tweet = sequelize.define('Tweet', {
        tweet_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING(280),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'Tweets',
        timestamps: true
    });

    return Tweet;
};
