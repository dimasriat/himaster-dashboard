const express = require("express");
const router = express.Router();

const { User, Post } = require("../models/index.model");

router.get("/add", async (req, res) => {
	try {
		const postbody = "capslock jebol";
		await Post.create({
			postbody,
			USERID: 1,
		});
		res.send('udah')
	} catch (err) {
		console.error(err);
	}
});

router.get("/", async (req, res) => {
	try {
		const user = await User.findAll({ include: [Post] });
		console.log(JSON.stringify(user, null, 2));
		// [
		// 	{
		// 		id: 1,
		// 		username: "dimasriat",
		// 		email: "dimasriat@student.uns.ac.id",
		// 		password:
		// 			"$2a$10$/BmAY4N9UPVEHt84Nl17puqMwJlg9yLJ10ZnK8ow7ArNvQkQ/2a2m",
		// 		resetPasswordToken: null,
		// 		resetPasswordExpires: null,
		// 		createdAt: "2020-06-30T11:25:16.000Z",
		// 		updatedAt: "2020-06-30T11:25:16.000Z",
		// 		posts: [
		// 			{
		// 				id: 1,
		// 				postbody: "halooooo",
		// 				createdAt: "2020-06-30T11:25:24.000Z",
		// 				updatedAt: "2020-06-30T11:25:24.000Z",
		// 				userId: 1,
		// 			},
		// 		],
		// 	},
		// ];

		const post = await Post.findAll({ include: [User] });
		console.log(JSON.stringify(post, null, 2));
		// [
		// 	{
		// 		id: 1,
		// 		postbody: "halooooo",
		// 		createdAt: "2020-06-30T11:25:24.000Z",
		// 		updatedAt: "2020-06-30T11:25:24.000Z",
		// 		userId: 1,
		// 		user: {
		// 			id: 1,
		// 			username: "dimasriat",
		// 			email: "dimasriat@student.uns.ac.id",
		// 			password:
		// 				"$2a$10$/BmAY4N9UPVEHt84Nl17puqMwJlg9yLJ10ZnK8ow7ArNvQkQ/2a2m",
		// 			resetPasswordToken: null,
		// 			resetPasswordExpires: null,
		// 			createdAt: "2020-06-30T11:25:16.000Z",
		// 			updatedAt: "2020-06-30T11:25:16.000Z",
		// 		},
		// 	},
		// ];

		res.send("cek cmd");
	} catch (err) {
		console.error(err);
	}
});

module.exports = router;
