const User = require("../models/User");

exports.GET = {
	/**
	 * --- DASHBOARD PAGE GET CONTROLLER ---
	 *
	 * khusus yang sudah login, bisa mengakses http://.../user
	 *
	 */
	DASHBOARD: async (req, res) => {
		try {
			const data = await User.findOne({
				where: { id: req.session.userid },
			});
			res.render("dashboard", { data });
		} catch (err) {
			throw err;
		}
	},
	/**
	 * --- LOGOUT GET CONTROLLER ---
	 *
	 * menghapus session, lalu mengarahkan ke http://.../
	 *
	 */
	LOGOUT: (req, res) => {
		req.session.destroy();
		res.redirect("/login");
	},
};
