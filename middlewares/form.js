const { check, validationResult, body } = require("express-validator");
const User = require("../models/User");

exports.postSubmit = [
	check("title", "title cannot be blank").exists(),
	check("body", "note cannot be blank").exists(),
];

exports.loginSubmit = [
	check("username", "username cannot be blank").exists(),
	check("password", "password cannot be blank").exists(),
];

exports.registerSubmit = [
	check("username", "username cannot be blank").exists(),
	body("username").custom((username) => {
		return User.findOne({ where: { username } }).then((found) => {
			if (found) {
				return Promise.reject("username has been taken");
			} else {
				return Promise.resolve();
			}
		});
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
