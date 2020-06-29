const express = require("express");
const router = express.Router();
const AUTH = require("../middlewares/auth");
const { GET } = require("../controllers/user");

/**
 * --- GET http://.../user ---
 * 
 * melewati middleware AUTH["LOGGED_ONLY"] (untuk mengecek apakah user sudah login)
 * kemudian controller GET["DASHBOARD"] untuk diarahkan ke halaman dashboard
 * 
 */
router.get("/", AUTH["LOGGED_ONLY"], GET["DASHBOARD"]);
/**
 * --- GET http://.../user/logout ---
 * 
 * melewati middleware AUTH["BOTH"] (langsung lewat)
 * kemudian controller GET["LOGOUT"] untuk menghapus session dan mengarahkan ke halaman login
 * 
 */
router.get("/logout", AUTH["BOTH"], GET["LOGOUT"]);

module.exports = router;
