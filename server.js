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
const indexRouter = require("./routers/index.router");
app.use("/", indexRouter);

const userRouter = require("./routers/user.router");
app.use("/user", userRouter);

const testRouter = require('./routers/test.router')
app.use('/test', testRouter)

app.listen(8000, () => console.log("server is running at port 8000"));
