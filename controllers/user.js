const { User, Post } = require("../models/");

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
				include: ["posts"],
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
	NEW_POST_PAGE: async (req, res) => {
		const data = await Post.findAll({
			where: { userId: req.session.userid },
		});
		res.render("new-post", { data });
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
	/**
	 * --- NEW POST CONTROLLER ---
	 *
	 * mengisi post ke database apabila sudah memenuhi syarat
	 *
	 */
	NEW_POST_PAGE: async (req, res) => {
		try {
			const { postbody } = req.body;
			await Post.create({
				postbody,
				userId: req.session.userid,
			});
			res.redirect("/user");
		} catch (err) {
			throw err;
		}
	},
};
