const User = require("../models/User");

exports.GET = {
	/**
	 * --- DASHBOARD PAGE GET CONTROLLER ---
	 *
	 * khusus yang sudah login, bisa mengakses http://.../user
	 *
	 */
	DASHBOARD_PAGE: async (req, res) => {
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
	 * --- NEW POST PAGE GET CONTROLLER ---
	 * 
	 * halaman untuk membuat post baru
	 * 
	 */
	NEW_POST_PAGE: (req, res) => {
		res.render('new-post')
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

exports.POST = {
	NEW_POST_PAGE: async (req, res) => {
		
	}
}