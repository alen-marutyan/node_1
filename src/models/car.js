module.exports = function (sequelize, DataTypes) {
  const Car = sequelize.define('Car',{
    car_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    license_plate: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },{
    timestamps: false,
  });

  Car.associate = function (models) {
    Car.belongsTo(models.User, {foreignKey: 'user_id', onDelete: 'cascade' });
    Car.hasOne(models.Model,{foreignKey: 'model_id', onDelete: 'cascade'})
  }


  sequelize.sync({alter: true, force: true})

  return Car;
}