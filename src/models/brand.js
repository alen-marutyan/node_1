module.exports = function (sequelize, DataTypes) {
  const Brand = sequelize.define('Brand',{
    brand_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
  },{
    timestamps: false,
  });

  Brand.associate = function (models) {
    Brand.belongsTo(models.Model,{foreignKey: 'model_id', onDelete: 'cascade'} );
  }

  sequelize.sync({alter: true, force: true})

  return Brand;
}



