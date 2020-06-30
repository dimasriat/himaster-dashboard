const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbinit");

const Post = sequelize.define("post", {
	postbody: DataTypes.STRING,
});

module.exports = Post;
