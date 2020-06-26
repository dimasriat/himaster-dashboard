const { check, validationResult } = require("express-validator");

module.exports = [
	check("title", "The note's title cannot be blank").not().isEmpty(),
	check("body", "The note's body cannot be blank").not().isEmpty(),
]
