const express = require("express");
const router = express.Router();

const { Admin, About, Team, Person } = require("../models/index.model");
const bcrypt = require("bcryptjs");

const FORM = require("../middlewares/form.middleware");
const AUTH = require("../middlewares/auth.middleware");
const UPLOAD = require("../middlewares/upload.middleware");

const fs = require("fs");
const path = require("path");

const fs_rename = (x, y) =>
	new Promise((resolve) => {
		fs.rename(x, y, () => resolve());
	});

router.get("/", AUTH["LOGGED_ONLY"], async (req, res) => {
	try {
		const about = await About.findOne({
			where: {
				adminId: req.session.adminId,
			},
		});
		res.render("test/dashboard", { about });
	} catch (err) {
		console.error(err);
	}
});

router.post("/", AUTH["LOGGED_ONLY"], UPLOAD["LOGO"], async (req, res) => {
	try {
		const { title, subtitle, visi, misi, filosofi } = req.body;
		const file = req.files.logo ? req.files.logo[0] : null;
		if (file) {
			const logo = `logo${path.extname(file.originalname)}`;
			await fs_rename(
				`${file.destination}/${file.filename}`,
				`${file.destination}/${logo}`
			);
			await About.update(
				{
					title,
					subtitle,
					visi,
					misi,
					filosofi,
					logo,
				},
				{
					where: {
						adminId: req.session.adminId,
					},
				}
			);
		} else {
			await About.update(
				{
					title,
					subtitle,
					visi,
					misi,
					filosofi,
				},
				{
					where: {
						adminId: req.session.adminId,
					},
				}
			);
		}

		return res.redirect("/");
	} catch (err) {
		console.error(err);
	}
});

router.get("/team", AUTH["LOGGED_ONLY"], async (req, res) => {
	try {
		const teams = await Team.findAll({
			where: { adminId: req.session.adminId },
		});
		res.render("test/add-team", { teams });
	} catch (err) {
		console.error(err);
	}
});

router.post("/team/add-team", AUTH["LOGGED_ONLY"], async (req, res) => {
	try {
		const { name, about } = req.body;
		await Team.create({
			name,
			about,
			adminId: req.session.adminId,
		});
		res.redirect("/admin/team");
	} catch (err) {
		console.error(err);
	}
});

router.get(
	"/team/add-person/:teamId",
	AUTH["LOGGED_ONLY"],
	async (req, res) => {
		const { teamId } = req.params;
		try {
			const team = await Team.findOne({
				where: { id: teamId },
				include: [Person]
			});
			// res.render("test/add-person", { team, people });
			res.send(team)
		} catch (err) {
			console.error(err);
		}
	}
);

router.get("/init", async (req, res) => {
	try {
		if (await Admin.findOne({ where: { year: "2020" } }))
			return res.redirect("/");
		let username = "himaster";
		let password = "dimdimdondon";

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const data = await Admin.create({
			username,
			password: hashedPassword,
		});

		await About.create({
			adminId: data.id,
		});
		res.send({ username, password, hashedPassword });
	} catch (err) {
		console.error(err);
	}
});

module.exports = router;
