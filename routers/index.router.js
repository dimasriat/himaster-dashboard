const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

const { Admin, About } = require("../models/index.model");
const bcrypt = require("bcryptjs");

const FORM = require("../middlewares/form.middleware");
const AUTH = require("../middlewares/auth.middleware");

const fs = require("fs");
const path = require("path");

const fs_rename = (x, y) =>
	new Promise((resolve) => {
		fs.rename(x, y, () => resolve());
	});

router.get("/", AUTH["BOTH"], async (req, res) => {
	try {
		const { id } = await Admin.findOne({
			where: { year: "2020" },
		});
		const about = await About.findOne({
			where: {
				adminId: id,
			},
		});
		console.log(JSON.stringify(await About.findAll(), null, 2));
		res.render("test/index", { about });
	} catch (err) {
		console.error(err);
	}
});
router.get("/about", AUTH["BOTH"], async (req, res) => {
	try {
		const { id } = await Admin.findOne({
			where: { year: "2020" },
		});
		const about = await About.findOne({
			where: {
				adminId: id,
			},
		});
		res.render("test/about", { about });
	} catch (err) {
		console.error(err);
	}
});
router.get("/event", AUTH["BOTH"], (req, res) => res.render("test/event"));
router.get("/gallery", AUTH["BOTH"], (req, res) => res.render("test/gallery"));
router.get("/team", AUTH["BOTH"], (req, res) => res.render("test/team"));
router.get("/login", AUTH["NOT_LOGGED_ONLY"], (req, res) =>
	res.render("test/login")
);
router.post(
	"/login",
	AUTH["NOT_LOGGED_ONLY"],
	FORM["LOGIN_SUBMIT"],
	(req, res) => {
		const error = validationResult(req);
		if (error.isEmpty()) {
			res.redirect("/admin");
		} else {
			req.flash("login", error.array());
			const err = req
				.flash("login")
				.map((item) => `<p>${item.msg}</p>`)
				.join("");
			res.send(err);
		}
	}
);

module.exports = router;
