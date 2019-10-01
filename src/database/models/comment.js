export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    commentBody: DataTypes.STRING,
    movieId: DataTypes.INTEGER,
    publicIp: DataTypes.STRING
  }, {});
  Comment.associate = () => {
    // associations can be defined here
  };
  return Comment;
};
