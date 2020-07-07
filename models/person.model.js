const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const Person = sequelize.define("person", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "himaster alpha",
	},
	bidang: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	position: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	photo: {
		type: DataTypes.STRING,
	},
});

module.exports = Person;
