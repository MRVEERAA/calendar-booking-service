const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/database");
const User = require("../../user/model/user.model");

const Meeting = sequelize.define(
  "Meeting",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    startTime: { type: DataTypes.DATE, allowNull: false },
    endTime: { type: DataTypes.DATE, allowNull: false },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  { tableName: "meetings", timestamps: true },
);

module.exports = Meeting;
