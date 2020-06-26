const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/assets", express.static(`${__dirname}/public`));

const indexRouter = require("./routers/index");
app.use("/", indexRouter);

app.listen(8000, () => console.log("server is running at port 8000"));
