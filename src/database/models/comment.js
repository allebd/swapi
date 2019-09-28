export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    commentBody: DataTypes.STRING,
    movieId: DataTypes.INTEGER,
    publicIp: DataTypes.STRING
  }, {});
  Comment.associate = () => {
    // associations can be defined here
  };
  return Comment;
};
