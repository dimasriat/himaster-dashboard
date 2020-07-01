const { User, Post } = require("../models/index.model");

exports.GET = {
	/**
	 * --- DASHBOARD PAGE GET CONTROLLER ---
	 *
	 * khusus yang sudah login, bisa mengakses http://.../user
	 *
	 */
	DASHBOARD_PAGE: async (req, res) => {
		try {
			const posts = await Post.findAll({
				include: [User],
				order: [["updatedAt", "DESC"]],
			});
			console.log(JSON.stringify(posts, null, 2));
			const { username } = req.session;
			res.render("with-auth/timeline", { posts, username });
		} catch (err) {
			throw err;
		}
	},

	/**
	 * --- PROFILE PAGE GET CONTROLLER ---
	 *
	 * khusus yang sudah login, bisa mengakses http://.../user/username
	 *
	 */
	PROFILE_PAGE: async (req, res) => {
		const { username } = req.params;
		try {
			const data = await User.findOne({
				where: {
					username,
				},
				include: [
					{
						model: Post,
						include: [User],
					},
				],
				order: [["updatedAt", "DESC"]],
			});
			const { posts } = data;
			res.render("with-auth/profile", { posts, data });
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
		res.render("with-auth/new-post", { data });
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
