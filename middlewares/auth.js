module.exports = {
	LOGGED_ONLY: (req, res, next) => {
		if (!req.session.isLoggedIn) {
			return res.redirect("/user/login"); //login page
		} else {
			return next();
		}
	},
	NOT_LOGGED_ONLY: (req, res, next) => {
		if (req.session.isLoggedIn) {
			return res.redirect("/user/login"); //login page
		} else {
			return next();
		}
	},
	BOTH: (req, res, next) => next(),
};
