const express = require("express");
const router = express.Router();

const AUTH = require("../middlewares/auth.middleware");

router.get("/", AUTH["BOTH"], (req, res) => {
	return res.render("index");
});
router.get("/profil", AUTH["BOTH"], (req, res) => {
	return res.render("profil");
});
router.get("/event", AUTH["BOTH"], (req, res) => {
	return res.render("event");
});
router.get("/event/:eventId", AUTH["BOTH"], (req, res) => {
	return res.render("event-view");
});
router.get("/team", AUTH["BOTH"], (req, res) => {
	return res.render("team");
});
router.get("/team/:teamId", AUTH["BOTH"], (req, res) => {
	return res.render("team-view");
});
router.get("/gallery", AUTH["BOTH"], (req, res) => {
	return res.render("gallery");
});
router.get("/gallery/:galleryId", AUTH["BOTH"], (req, res) => {
	return res.render("gallery-view");
});
router.get('/login', AUTH['NOT_LOGGED_ONLY'], (req, res) => {
	return res.render('login');
})

module.exports = router;
