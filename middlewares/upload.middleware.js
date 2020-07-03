const multer = require("multer");

/**
 * --- AVATAR UPLOAD MIDDLEWARE ---
 *
 * mengambil isi fields 'avatar' di form enctype="multipart/form-data"
 * lalu menaruh filenya di req.files.avatar = [file]
 */
exports.LOGO = multer({ dest: `${__dirname}/../public/upload/images` }).fields([
	{ name: "logo", maxCount: 1 },
]);
