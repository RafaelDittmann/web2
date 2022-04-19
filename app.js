const db_mongoose = require("./config/db_mongoose");
const routes = require("./routers/route");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
var cookieParser = require("cookie-parser");
var session = require("express-session");
const express = require("express");
const app = express();
app.use(cookieParser());
app.use(
  session({
    secret: "textosecreto",
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 },
  })
);
app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

mongoose
  .connect(db_mongoose.connection, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Conectado com o BD");
  })
  .catch(() => {
    console.log("Erro na conexão com o BD");
  });

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.listen(8081, function () {
  console.log("Servidor no http://localhost:8081");
});
