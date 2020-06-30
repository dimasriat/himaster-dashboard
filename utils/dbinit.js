const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("async_me", "root", null, {
	host: "localhost",
	dialect: "mysql",
});

(async () => {
	try {
		const resetTable = true;
		await sequelize.sync({ force: resetTable });
	} catch (err) {
		throw err;
	}
})();

module.exports = sequelize;
