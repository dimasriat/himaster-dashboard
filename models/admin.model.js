const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const Admin = sequelize.define("admin", {
	username: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	year: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "2020",
	},
	// resetPasswordToken: DataTypes.STRING,
	// resetPasswordExpires: DataTypes.DATE,
});

module.exports = Admin;
