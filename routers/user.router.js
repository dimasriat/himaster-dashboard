const express = require("express");
const router = express.Router();

// middlewares
const AUTH = require("../middlewares/auth.middleware");
const FORM = require("../middlewares/form.middleware");
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
 * --- GET http://.../user/username ---
 *
 * melewati middleware AUTH["LOGGED_ONLY"] (untuk mengecek apakah user sudah login)
 * kemudian controller GET["PROFILE_PAGE"] untuk diarahkan ke halaman dashboard
 *
 */
router.get("/:username", AUTH["BOTH"], USER.GET["PROFILE_PAGE"]);

/**
 * --- GET http://.../user/new-post ---
 *
 * mengarahkan ke halaman untuk membuat post baru
 *
 * logged only
 */
router.get("/new-post", AUTH["LOGGED_ONLY"], USER.GET["NEW_POST_PAGE"]);

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
	USER.POST["NEW_POST_PAGE"]
);

/**
 * --- GET http://.../user/logout ---
 *
 * melewati middleware AUTH["BOTH"] (langsung lewat)
 * kemudian controller GET["LOGOUT"] untuk menghapus session dan mengarahkan ke halaman login
 *
 */
router.get("/logout", AUTH["BOTH"], USER.GET["LOGOUT"]);

module.exports = router;
