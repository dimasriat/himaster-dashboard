const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const User = sequelize.define("user", {
	username: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	resetPasswordToken: DataTypes.STRING,
	resetPasswordExpires: DataTypes.DATE,
});

module.exports = User;
