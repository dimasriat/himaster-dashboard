const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { User, Post } = require("../models/index.model");

exports.GET = {
	/**
	 * --- HOME PAGE GET CONTROLLER ---
	 *
	 * gaada yang spesial sih dari ini, sebenernya cuma ngarahin ke landing page aja
	 *
	 */
	HOME_PAGE: async (req, res) => {
		try {
			const posts = await Post.findAll({
				include: [User],
				order: [["updatedAt", "DESC"]],
			});
			console.log(JSON.stringify(posts, null, 2));
			res.render("no-auth/landing", { posts });
		} catch (err) {
			throw err;
		}
	},
	/**
	 * --- LOGIN PAGE GET CONTROLLER ---
	 *
	 * mengarahkan ke halaman login, dengan mengambil pula nilai dari error dalam flash
	 *
	 */
	LOGIN_PAGE: (req, res) => {
		const error = req.flash("login");
		res.render("no-auth/login", { error });
	},
	/**
	 * --- REGISTER PAGE GET CONTROLLER ---
	 *
	 * mengarahkan ke halaman register, dengan mengambil pula nilai dari error dalam flash
	 *
	 */
	REGISTER_PAGE: (req, res) => {
		const error = req.flash("register");
		res.render("no-auth/register", { error });
	},
};

exports.POST = {
	/**
	 * --- LOGIN PAGE POST CONTROLLER ---
	 *
	 * jika sukses login, yang mana dilakukan di middleware,
	 * maka akan diarahkan ke http://.../user/
	 *
	 * jika gagal login, maka akan diarahkan ke http://.../login/
	 * dengan menampilkan kesalahan apa saja dalam submit form tersebut
	 * yang sudah dicek di middleware
	 *
	 */
	LOGIN_PAGE: (req, res) => {
		const error = validationResult(req);
		if (error.isEmpty()) {
			return res.redirect("/user/");
		} else {
			req.flash("login", error.array());
			return res.redirect("/login");
		}
	},
	/**
	 * --- REGISTER PAGE POST CONTROLLER ---
	 *
	 * setelah formnya dicek di middleware dan siap dimasukkan,
	 * controller ini bertujuan untuk menginput data + password yg sudah di hash
	 *
	 * jika sukses, maka akan diarahkan ke http://.../login
	 * untuk login dengan akun yang sudah dibuat tadi
	 *
	 * jika gagal (terdapat error di middleware sebelumnya),
	 * maka akan diarahkan ke http://.../register,
	 * dengan beberapa laporan error berupa flash
	 *
	 */
	REGISTER_PAGE: async (req, res) => {
		const error = validationResult(req);

		if (error.isEmpty()) {
			try {
				const { username, password, email } = req.body;

				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(password, salt);

				await User.create({
					username,
					password: hashedPassword,
					email,
				});

				return res.redirect("/login");
			} catch (err) {
				throw err;
			}
		} else {
			req.flash("register", error.array());
			return res.redirect("/register");
		}
	},
};
