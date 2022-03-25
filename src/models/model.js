module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define("Model", {
    model_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    },{
    timestamps: false,
  });


  Model.associate = function (models) {
    Model.belongsTo(models.Car, {foreignKey: 'car_id', onDelete: 'cascade' });
  }

  sequelize.sync({alter: true})


  return Model;
};


