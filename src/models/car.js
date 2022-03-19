'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,model,brand_name}) {
      // define association here

      this.belongsTo(User, {
        foreignKey: 'id',
        as: 'User'
      });

      this.hasOne(model, {
        foreignKey: 'id',
        as: 'model'
      });

      this.hasOne(brand_name, {
        foreignKey: 'id',
        as: 'brand_name'
      });
    }
  }
  Car.init({
    license_plate: DataTypes.STRING,
    model_car: DataTypes.INTEGER,
    brand_name_car: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};