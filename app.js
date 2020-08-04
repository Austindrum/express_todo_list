// require defult modules
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require('method-override');
require("dotenv").config();
const app = express();

// require custmer modules
const routes = require("./routes");
const usePassport = require("./config/passport");
require("./config/db");

// set ejs
app.set("view engine", "ejs");

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true    
}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

usePassport(app);
app.use(flash());
app.use((req, res, next)=>{
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.user = req.user;
    res.locals.success_msg = req.flash("success_msg");
    res.locals.warning_msg = req.flash("warning_msg");
    next();
});
app.use(routes);

// server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Serve Start on PORT ${PORT}`);
})