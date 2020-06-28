const { check, validationResult, body } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.postSubmit = [
	check("title", "title cannot be blank").exists(),
	check("body", "note cannot be blank").exists(),
];

exports.loginSubmit = [
	check("username", "username cannot be blank").not().isEmpty(),
	check("password", "password cannot be blank").not().isEmpty(),
	body("username").custom(async (username, { req }) => {
		const found = await User.findOne({ where: { username } });
		if (!found) return Promise.reject("username or password is wrong");
		const accepted = await bcrypt.compare(
			req.body.password,
			found.password
		);
		if (!accepted) return Promise.reject("username or password is wrong");
	}),
];

exports.registerSubmit = [
	check("username", "username cannot be blank").exists(),
	body("username").custom(async (username) => {
		const found = await User.findOne({ where: { username } });
		return found
			? Promise.reject("username has been taken")
			: Promise.resolve();
	}),
	check("email", "email cannot be blank").exists(),
	check("email", "email are not valid").isEmail(),
	check("password", "password cannot be blank").exists(),
	check("password", "password length must be 8 character minimal").isLength({
		min: 8,
	}),
	check(
		"password2",
		"password confirmation must have same value as your password"
	)
		.exists()
		.custom((value, { req }) => value === req.body.password),
];

exports.validationResult = validationResult;
