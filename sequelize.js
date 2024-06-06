const Sequelize = require('sequelize');
const UserModel = require('./models/User');
const TweetModel = require('./models/Tweet');
const FollowModel = require('./models/Follow');
const LikeModel = require('./models/Like');
const CommentModel = require('./models/Comment');

const sequelize = new Sequelize(
    process.env.DB_SCHEMA,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false
    }
);

const User = UserModel(sequelize, Sequelize);
const Tweet = TweetModel(sequelize, Sequelize);
const Follow = FollowModel(sequelize, Sequelize);
const Like = LikeModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);

User.hasMany(Tweet, { foreignKey: 'user_id' });
Tweet.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.belongsToMany(User, { through: Follow, as: 'Followers', foreignKey: 'follower_id' });
User.belongsToMany(User, { through: Follow, as: 'Following', foreignKey: 'following_id' });

Tweet.hasMany(Like, { foreignKey: 'tweet_id', as: 'likes' });
Like.belongsTo(Tweet, { foreignKey: 'tweet_id' });

User.hasMany(Like, { foreignKey: 'user_id' });
Like.belongsTo(User, { foreignKey: 'user_id' });

Tweet.hasMany(Comment, { foreignKey: 'tweet_id', as: 'comments' });
Comment.belongsTo(Tweet, { foreignKey: 'tweet_id', as: 'tweet' });

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database & tables created!');
    });

module.exports = {
    User,
    Tweet,
    Follow,
    Like,
    Comment
};
