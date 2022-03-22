'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class brand_name extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Car}) {
      // define association here
      this.belongsTo(Car, {
        foreignKey: 'id',
        as: 'Car'
      });
    }
  }
  brand_name.init({
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    author: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'brand_name',
  });
  return brand_name;
};