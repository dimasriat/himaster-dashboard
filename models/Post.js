const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbinit");

const Post = sequelize.define("Post", {
	postbody: DataTypes.STRING,
});

module.exports = Post;
