const express = require("express");
const router = express.Router();
const AUTH = require("../middlewares/auth");
const FORM = require("../middlewares/form");
const { GET, POST } = require("../controllers/index");

/**
 * --- GET http://.../ ---
 * 
 * melewati middleware AUTH[BOTH] (tanpa autentikasi)
 * kemudian controller GET["HOMEPAGE"] untuk diarahkan
 * 
 */
router.get("/", AUTH["BOTH"], GET["HOME_PAGE"]);
/**
 * --- GET http://.../login ---
 * 
 * melewati middleware AUTH["NOT_LOGGED_ONLY"] (khusus belum login)
 * kemudian controller GET["LOGIN_PAGE"] untuk diarahkan
 * 
 */
router.get("/login", AUTH["NOT_LOGGED_ONLY"], GET["LOGIN_PAGE"]);
/**
 * --- POST http://.../login ---
 * 
 * menjadi action setelah kita mengisi form login
 * melewati 2 middleware sebelum mencapai controller
 * 
 * middleware #1: pengecekkan apakah sebelumnya user sudah login?
 * kalo udah ya harus logout dulu baru bisa lanjut login lagi
 * 
 * middleware #2: pengecekkan isi formulir login apakah sudah cocok dan ada di dalam database?
 * pengaturan session dilakukan di middleware, bukan di controller
 * karena sekalian pas ngecek dapet useridnya di sessionnya
 * 
 */
router.post(
	"/login",
	AUTH["NOT_LOGGED_ONLY"],
	FORM["LOGIN_SUBMIT"],
	POST["LOGIN_PAGE"]
);
/**
 * --- GET http://.../register ---
 * 
 * melewati middleware AUTH["NOT_LOGGED_ONLY"] (khusus belum login)
 * kemudian controller GET["REGISTER_PAGE"] untuk diarahkan
 * 
 */
router.get("/register", AUTH["NOT_LOGGED_ONLY"], GET["REGISTER_PAGE"]);
/**
 * --- POST http://.../register ---
 * 
 * menjadi action setelah kita mengisi form register
 * melewati 2 middleware sebelum mencapai controller
 * 
 * middleware #1: pengecekkan apakah sebelumnya user sudah login?
 * kalo udah ya harus logout dulu baru bisa lanjut register lagi
 * 
 * middleware #2: pengecekkan isi formulir register apakah sudah layak dimasukkan ke dalam database?
 * jika sudah layak, maka data dimasukkan di dalam database di bagian controller, bukan di middleware
 * setelah itu diarahkan ke http://.../login untuk masuk
 * 
 */
router.post(
	"/register",
	AUTH["NOT_LOGGED_ONLY"],
	FORM["REGISTER_SUBMIT"],
	POST["REGISTER_PAGE"]
);

module.exports = router;
