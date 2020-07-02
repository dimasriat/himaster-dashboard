const express = require("express");
const router = express.Router();

// middlewares
const AUTH = require("../middlewares/auth.middleware");
const FORM = require("../middlewares/form.middleware");
const UPLOAD = require("../middlewares/upload.middleware");
// controllers
const USER = require("../controllers/user.controller");

/**
 * --- GET http://.../user ---
 *
 * melewati middleware AUTH["LOGGED_ONLY"] (untuk mengecek apakah user sudah login)
 * kemudian controller GET["DASHBOARD_PAGE"] untuk diarahkan ke halaman dashboard
 *
 */
router.get("/", AUTH["LOGGED_ONLY"], USER.GET["DASHBOARD_PAGE"]);

/**
 * --- POST http://.../user/new-post ---
 *
 * mengarahkan ke halaman untuk membuat post baru
 *
 * logged only
 */
router.post(
	"/new-post",
	FORM["NEW_POST_SUBMIT"],
	AUTH["LOGGED_ONLY"],
	USER.POST["NEW_POST_HANDLER"]
);

/**
 * --- GET http://.../user/settings ---
 *
 * merupakan halaman untuk mengganti profil
 * melewati autentikasi (harus sudah login)
 *
 */
router.get("/settings", AUTH["LOGGED_ONLY"], USER.GET["SETTINGS_PAGE"]);

/**
 * --- POST http://.../user/settings/basic-settings ---
 * 
 * merupakan bagian submit basic settings di pengaturan user
 */
router.post(
	"/settings/basic-settings",
	AUTH["LOGGED_ONLY"],
	UPLOAD["AVATAR"],
	// FORM["BASIC_SETTINGS_SUBMIT"],
	USER.POST["BASIC_SETTINGS_HANDLER"]
);

/**
 * --- GET http://.../user/logout ---
 *
 * melewati middleware AUTH["BOTH"] (langsung lewat)
 * kemudian controller GET["LOGOUT"] untuk menghapus session dan mengarahkan ke halaman login
 *
 */
router.get("/logout", AUTH["BOTH"], USER.GET["LOGOUT"]);

/**
 * --- GET http://.../user/username ---
 *
 * melewati middleware AUTH["LOGGED_ONLY"] (untuk mengecek apakah user sudah login)
 * kemudian controller GET["PROFILE_PAGE"] untuk diarahkan ke halaman dashboard
 *
 */
router.get("/:username", AUTH["BOTH"], USER.GET["PROFILE_PAGE"]);

module.exports = router;
