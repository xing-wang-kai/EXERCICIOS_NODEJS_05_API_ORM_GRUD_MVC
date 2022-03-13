'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Turmas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Turmas.hasMany(models.Matriculas, {foreignKey: "turmas_id"})
      Turmas.belongsTo(models.Pessoas, {foreignKey: "docentes_id"})
      Turmas.belongsTo(models.Niveis, {foreignKey: "niveis_id"})
    }
  }
  Turmas.init({
    data_inicio: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Turmas',
    paranoid: true,
    
  });
  return Turmas;
};