const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { postSubmit, validationResult } = require("../middlewares");

router.get("/", async (req, res) => {
	try {
		const data = await Post.findAll();
		res.render("read", { data });
	} catch (err) {
		throw err;
	}
});

router
	.get("/create", (req, res) => {
		res.render("create", { error: [] });
	})
	.post("/create", postSubmit, async (req, res) => {
		const postError = validationResult(req);
		if (!postError.isEmpty()) {
			return res.render("create", { error: postError.array() });
		}
		try {
			const { title, body } = req.body;
			await Post.create({ title, body });
			res.redirect("/");
		} catch (err) {
			throw err;
		}
	});

// bagian page update nih ditest lagi ada bug pas submit
router.get("/update/:id", async (req, res) => {
	try {
		const data = await Post.findOne({
			where: {
				id: req.params.id,
			},
		});
		if (data) {
			res.render("update", { data, error: [] });
		} else {
			res.redirect("/");
		}
	} catch (err) {
		throw err;
	}
});

// ada bug di bagian update post tapi pas kosongan fieldnya
// Cannot POST /update/
router.post("/update/:id", postSubmit, async (req, res) => {
	const postError = validationResult(req);
	if (!postError.isEmpty()) {
		return res.render("update", {
			data: req.body,
			error: postError.array(),
		});
	}
	try {
		const { title, body } = req.body;
		await Post.update(
			{ title, body },
			{
				where: {
					id: req.params.id,
				},
			}
		);
		res.redirect("/");
	} catch (err) {
		throw err;
	}
});

router.get("/delete/:id", async (req, res) => {
	try {
		await Post.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.redirect("/");
	} catch (err) {
		throw err;
	}
});

module.exports = router;
