const express = require("express");
const path = require("path");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const app = express();
const router = require("./router");
const nocashe=require('nocache')

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))


app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
);
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

app.use("/route", router);

app.get("/", (req, res) => {
  if (req.session.user){
  res.redirect("/route/dashboard");
  }else{
    res.render("base", {title:"login"})
  }
});


const PORT = 8880;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

