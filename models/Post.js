const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbinit");

const Post = sequelize.define("Post", {
	title: DataTypes.STRING,
	body: DataTypes.TEXT,
});

module.exports = Post;
