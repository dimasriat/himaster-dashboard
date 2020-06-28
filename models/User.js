const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbinit");

const User = sequelize.define("Post", {
	username: {
		type: DataTypes.STRING
	}
});

module.exports = User;
