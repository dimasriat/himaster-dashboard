const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const Event = sequelize.define("event", {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	body: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	date: DataTypes.DATE,
});

module.exports = Event;
