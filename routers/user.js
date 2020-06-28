const express = require("express");
const router = express.Router();
const {
	loginSubmit,
	registerSubmit,
	validationResult,
} = require("../middlewares/form");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

router.get("/", async (req, res) => {
	try {
		if (req.session.isLoggedIn) {
			const { username } = await User.findOne({
				where: { id: req.session.userid },
			});
			res.render("dashboard", { msg: `Selamat malam ${username}!` });
		} else {
			res.render("dashboard", { msg: "koe sopo asu" });
		}
	} catch (err) {
		console.error(err);
		res.send(err);
	}
});

router.get("/logout", (req, res) => {
	req.session.destroy();
	res.redirect("/user");
});

router
	.get("/login", (req, res) => {
		const error = req.flash("login");
		res.render("login", { error });
	})
	.post("/login", loginSubmit, (req, res) => {
		const error = validationResult(req);
		if (error.isEmpty()) {
			return res.redirect("/user/");
		} else {
			req.flash("login", error.array());
			return res.redirect("/user/login");
		}
	});

router
	.get("/register", (req, res) => {
		const error = req.flash("register");
		res.render("register", { error });
	})
	.post("/register", registerSubmit, async (req, res) => {
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

				return res.redirect("/user/login");
			} catch (err) {
				throw err;
			}
		} else {
			req.flash("register", error.array());
			return res.redirect("/user/register");
		}
	});

module.exports = router;
