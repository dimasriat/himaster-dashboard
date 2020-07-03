const AUTH = {
	/**
	 * --- LOGGED_ONLY ---
	 * 
	 * jika melewati ini dan BELUM LOGIN
	 * maka akan diarahkan ke http://.../login
	 * 
	 */
	LOGGED_ONLY: (req, res, next) => {
		if (!req.session.isLoggedIn) return res.redirect("/login");
		next();
	},
	/**
	 * --- NOT_LOGGED_ONLY ---
	 * 
	 * jika melewati ini dan SUDAH LOGIN
	 * maka akan diarahkan ke http://.../user
	 * 
	 */
	NOT_LOGGED_ONLY: (req, res, next) => {
		if (req.session.isLoggedIn) return res.redirect("/admin");
		next();
	},
	/**
	 * --- BOTH ---
	 * 
	 * gausah dianggep langsung lewat pokoknya
	 * 
	 */
	BOTH: (req, res, next) => next(),
};

module.exports = AUTH;
