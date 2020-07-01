const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const Post = sequelize.define("post", {
	postbody: DataTypes.STRING,
});

module.exports = Post;
