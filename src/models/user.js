module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User',{
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    timestamps: false
  });

  User.associate = function (models) {
    User.hasMany(models.Car,{foreignKey: 'user_id', onDelete: 'cascade'});
  }

  sequelize.sync({alter: true, force: true})
  return User;
};





