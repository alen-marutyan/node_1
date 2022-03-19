'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class model extends Model {
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
  model.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'model',
  });
  return model;
};