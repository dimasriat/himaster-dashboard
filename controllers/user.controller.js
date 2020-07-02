const { User, Post } = require("../models/index.model");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const fs_rename = (x, y) =>
	new Promise((resolve) => {
		fs.rename(x, y, () => resolve());
	});

exports.GET = {
	/**
	 * --- DASHBOARD PAGE GET CONTROLLER ---
	 *
	 * khusus yang sudah login, bisa mengakses http://.../user
	 *
	 */
	DASHBOARD_PAGE: async (req, res) => {
		const error = req.flash("new-post");
		try {
			const posts = await Post.findAll({
				include: [User],
				order: [["updatedAt", "DESC"]],
			});
			console.log(JSON.stringify(posts, null, 2));
			const { username } = req.session;
			res.render("with-auth/timeline", { posts, username, error });
		} catch (err) {
			console.error(err);
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
						order: [["createdAt", "DESC"]],
					},
				],
			});
			const posts = data.posts ? data.posts : [];
			res.render("with-auth/profile", { username, posts, data });
		} catch (err) {
			throw err;
		}
	},

	/**
	 * --- SETTINGS PAGE GET CONTROLLER ---
	 *
	 * digunakan untuk halam settings user agar bisa mengubah profilnya dia
	 */
	SETTINGS_PAGE: async (req, res) => {
		const { username } = req.session;
		const error = req.flash("settings");
		try {
			const data = await User.findOne({
				where: {
					username,
				},
			});
			res.render("with-auth/settings", { username, data, error });
		} catch (err) {
			console.error(err);
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

exports.POST = {
	/**
	 * --- NEW POST CONTROLLER ---
	 *
	 * mengisi post ke database apabila sudah memenuhi syarat
	 *
	 */
	NEW_POST_HANDLER: async (req, res) => {
		const error = validationResult(req);
		if (error.isEmpty()) {
			try {
				const { title, body } = req.body;
				await Post.create({
					title,
					body,
					userId: req.session.userid,
				});
				res.redirect("/user");
			} catch (err) {
				console.error(err);
			}
		} else {
			req.flash("new-post", error.array());
			return res.redirect("/user");
		}
	},

	BASIC_SETTINGS_HANDLER: async (req, res) => {
		// const error = validationResult(req);
		// console.log(JSON.stringify(req.body, null, 2));
		// console.log(JSON.stringify(req.files, null, 2))
		// res.send('cek cmd')
		// console.log(
		// 	error.isEmpty() ? "tidak error" : "ERROR CUKKK",
		// 	error.array()
		// );
		// if (error.isEmpty()) {
		try {
			const { bio } = req.body;
			// 	// console.log("files", JSON.stringify(req.files, null, 2));
			// 	console.log("body", JSON.stringify(req.body, null, 2));
			// const avatar = `${req.files?.avatar[0]?.filename}${path.extname(req.)}`;
			// 	// 	? req.files.avatar[0].filename
			// 	// 	: "";
			const file = req.files.avatar ? req.files.avatar[0] : null;
			console.log(JSON.stringify(file, null, 2))
			if (file) {
				const avatar = `${req.session.userid}${path.extname(
					file.originalname
				)}`;
				await fs_rename(
					`${file.destination}/${file.filename}`,
					`${file.destination}/${avatar}`
				);
				await User.update(
					{
						bio,
						avatar,
					},
					{
						where: {
							id: req.session.userid,
						},
					}
				);
			} else {
				await User.update(
					{
						bio,
					},
					{
						where: {
							id: req.session.userid,
						},
					}
				);
			}

			return res.redirect("/user/settings");
			// 	// return res.send(
			// 	// 	JSON.stringify(req.body) +
			// 	// 		"<br/>" +
			// 	// 		JSON.stringify(req.files)
			// 	// );
		} catch (err) {
			console.error(err);
		}
		// } else {
		// 	req.flash("basic-settings", error.array());
		// 	return res.redirect("/user/settings");
		// }
	},
};
