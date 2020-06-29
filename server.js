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

// const indexRouter = require("./routers/index");
// app.use("/", indexRouter);

// const userRouter = require("./routers/user");
// app.use("/user", userRouter);

/**TEST ROUTER
 * digunakan untuk mendebug router
 */
app.get("/", (req, res) => res.render("index"));

app.listen(8000, () => console.log("server is running at port 8000"));
