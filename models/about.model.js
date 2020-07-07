const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const About = sequelize.define("about", {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "NAMA ORGANISASI ANDA",
	},
	subtitle: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue: "Deskripsi singkat tentang organisasi anda. Deskripsi ini bisa berupa slogan, jargon, ataupun kalimat yang mewakili semangat organisasi anda"
	},
	visi: {
		type: DataTypes.TEXT,
		defaultValue: "Deskripsi singkat tentang visi yang dimiliki organisasi anda",
	},
	misi: {
		type: DataTypes.TEXT,
		defaultValue: "Deskripsi singkat tentang misi yang dimiliki organisasi anda dalam bentuk list",
	},
	logo: {
		type: DataTypes.STRING,
	},
	filosofi: {
		type: DataTypes.TEXT,
		defaultValue: "filosofi dari logo organisasi anda",
	},
});

module.exports = About;
