const { check, validationResult, body } = require("express-validator");
const { Admin } = require("../models/index.model");
const bcrypt = require("bcryptjs");

/**
 * --- NEW POST SUBMIT MIDDLEWARE ---
 *
 * yang dicek adalah form postbody
 */
exports.NEW_POST_SUBMIT = [
	check("title", "title cannot be blank").not().isEmpty(),
	check("body", "post cannot be blank").not().isEmpty(),
];
exports.BASIC_SETTINGS_SUBMIT = [
	check("bio", "bio cannot be blank").not().isEmpty(),
];

/**
 * --- LOGIN SUBMIT MIDDLEWARE ---
 *
 * pengaturan session dilakukan di sini sekaligus mengecek apakah user + password cocok
 * jadi setelah melewati middleware ini, langusng sudah dianggap login
 * kemudian akan diarahkan menuju halaman yang dikhususkan untuk pengguna login
 *
 */
exports.LOGIN_SUBMIT = [
	check("username", "username cannot be blank").not().isEmpty(),
	check("password", "password cannot be blank").not().isEmpty(),
	body("username").custom(async (username, { req }) => {
		const found = await Admin.findOne({ where: { username } });
		if (!found) return Promise.reject("username or password is wrong");
		const accepted = await bcrypt.compare(
			req.body.password,
			found.password
		);
		if (!accepted) return Promise.reject("username or password is wrong");
		req.session.adminId = found.id;
		req.session.username = found.username;
		req.session.isLoggedIn = true;
	}),
];

/**
 * --- REGISTER SUBMIT MIDDLEWARE ---
 *
 * middleware ini mengecek apakah data sudah cocok bisa dimasukkan ke dalam database
 * dan tentu saja tidak ada duplikat di database
 *
 * sementara untuk input data ke database nya tetap dilakukan oleh sang controller
 *
 */
exports.REGISTER_SUBMIT = [
	check("username", "username cannot be blank").not().isEmpty(),
	body("username").custom(async (username) => {
		const found = await Admin.findOne({ where: { username } });
		if (found) return Promise.reject("username has been taken");
	}),
	check("email", "email cannot be blank").not().isEmpty(),
	check("email", "email are not valid").isEmail(),
	check("password", "password cannot be blank").not().isEmpty(),
	check("password", "password length must be 8 character minimal").isLength({
		min: 8,
	}),
	check(
		"password2",
		"password confirmation must have same value as your password"
	)
		.not()
		.isEmpty()
		.custom((value, { req }) => value === req.body.password),
];

exports.validationResult = validationResult;
