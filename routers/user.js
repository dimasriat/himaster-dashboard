const express = require("express");
const router = express.Router();
const {
	loginSubmit,
	registerSubmit,
	validationResult,
} = require("../middlewares");

// const User = require("../models/User");
// router.get("/", (req, res) => res.send('holaaaa'))
router.get("/", (req, res) => {
	res.render("dashboard");
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
	.post("/register", registerSubmit, (req, res) => {
		const error = validationResult(req);
		if (error.isEmpty()) {
			return res.redirect("/user/login");
		} else {
			req.flash("register", error.array());
			return res.redirect("/user/register");
		}
	});

module.exports = router;
