const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const Post = sequelize.define("post", {
	title: DataTypes.STRING,
	body: DataTypes.STRING,
});

module.exports = Post;
