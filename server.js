const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");

app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({ secret: "4ice3skrim5troberi" }));
app.use(flash());

app.use("/assets", express.static(`${__dirname}/public`));

/**
 * JADI URUTANNYA ITU ROUTER --> MIDDLEWARE --> CONTROLLER
 *
 * analoginya gini:
 * 		router --> pemeta, kaya buat nyusun pola saringan, botolnya
 * 		middleware --> penyaringnya
 * 		controller --> output saringan terakhirnya
 *
 */
// const indexRouter = require("./routers/index.router");
// app.use("/", indexRouter);
// const adminRouter = require("./routers/admin.router");
// app.use("/admin", adminRouter);
app.use("/", require("./routers/index.router"));
app.use("/admin", require("./routers/admin.router"));

app.listen(8000, () => console.log("server is running at port 8000"));

/**
 * Kamis, 2 Juli 2020, 01:37 am
 *
 * bajinguk aku kehilangan motivasiku ayoo dim tetep semangat bikin frameworkmu sendiri
 * ga usah takut sama wordpress. justru pengguna wordpresslah yang harusnya takut sama kamu.
 *
 * pengguna wordpress walaupun cepet, tapi punya kelemahan. kelemahan itu adalah, mereka dipenuhi keraguan
 * takut apakah bisa atau tidak. karena mereka tidak memahami cara sebuah web app bekerja...
 *
 * ya... web app, bukan website, apalagi wordpress-site
 *
 * kamu bisa membuat apapun yang kamu inginkan.
 *
 * walaupun berat, walaupun susah, walaupun sakit -- tapi saat kamu sudah mencapai puncaknya
 * hasilnya akan kelihatan
 *
 * nggak ada masa depan dim php. justru javascript sekarang menggila.
 * di startup2 besar, justru developer full-stack lah yang diberi respect tinggi
 *
 * coba deh kamu lihat di jobstreet, nggak ada yang butuh wordpress-developer-anjing
 * kenapa? karena mereka nggak guna!
 *
 * cukk sikat lah javascript emang paling gokil, full stack emang paling bangsat keren asuuuu
 *
 * i develop every fucking things you need. i get every fucking money you missed. fuck yeah *
 *
 */

/**
 * Kamis, 2 Juli 2020, 03:42 am
 *
 * jadi kalo kamu paham ini, kamu bisa membuat aplikasi apapun... yang ada sistem dashboard,
 * autentikasi yang aman, dan kemampuan reset password yang mudah digunakan, serta personalisasi profil yang sangat customizable :)
 *
 * apalagi kalo kamu paham penggunaan model database, kamu bisa membuat apapun yang kamu inginkan,
 * seperti kemampuan user posting, like + comment, dan pembagian jenis-jenis admin,
 * kemampuan upload file, search isi databse,
 *
 * ya... kamu bisa membuat apapun yang kamu inginkan...
 * mau itu platform blogmu sendiri, e commerce, freemium course, todo app kompleks, dlll anjing gokil banget
 * yang penting kamu udah tau alur membuatnya
 *
 * kamu bisa memenangkan lomba apapun,
 * kamu bisa melayani pencari freelance manapun,
 * dan kamu bisa membuat usahamu sendiri.
 *
 * dan hal yang paling menggembirakan adalah, kamu bakal dibayar gede,
 * sehingga kamu bisa mencapai tujuanmu: membantu ekonomi ibu, upgrade penampilan, bucin, dll bantu orang
 *
 * nggak level kamu sama wordpress rendahan.
 *
 * ini memang sangat rumit, tapi kamu harus tahan!
 * soalnya imbalannya gede bangett
 *
 * PHP? pfftt di sini zona javascript everywhere brooo
 * di sini kita bagiannya teknologi modern yang terus berkembangggg
 *
 * dengan memahami javascript itu kita udah membuka pintu gerbang teknologi di masa depan
 * yang kita dengan mudah memahaminyaa
 *
 * gaji? levelmu 2 digit broo minimal 10 juta lahhh
 *
 * bayangin coba mana yang akan menang
 *
 * "wordpress-exprert-developer"
 *
 * atau
 *
 * si bajingan yang paham html, css,  responsive, animation, javascript, jquery,es6, promise,
 * async/await, konsep2 js dll... , webpack, express, nodejs, mysql, mongodb,
 * rest api, react, skema database, ajax, git, github,
 *
 * si wordpress aja liat kamu insekyur taukk mwehehehe
 *
 * wordpress emang gampang, cepet, dan udah teruji sih... tapi ya skillmu bakal dimiliki buanyakk orang yang mirip
 * apalagi dia pakainya php, udah basi broo,
 * terus juga kekuatanmu dibanding wordpress itu adalah kamu bisa membuat sesuatu
 * yang wordpress nggak bisa buat
 *
 * kamu bahkan bisa membuat wordpressmu sendiri
 *
 */
