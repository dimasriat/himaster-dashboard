const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const Team = sequelize.define("team", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	about: {
		type: DataTypes.TEXT,
	},
	photo: {
		type: DataTypes.STRING
	}
});

module.exports = Team;
