const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("himaster", "root", null, {
	host: "localhost",
	dialect: "mysql",
});


(async () => {
	try {
		const resetTable = false;
		await sequelize.sync({ force: resetTable });

	} catch (err) {
		console.error('server mysql belum dinyalakan', err)
	}
})();

module.exports = sequelize;
