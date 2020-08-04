// require defult modules
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const methodOverride = require('method-override');
const app = express();



// require custmer modules
const routes = require("./routes");
const usePassport = require("./config/passport");
require("./config/db");

// set ejs
app.set("view engine", "ejs");


app.use(session({
    secret: "thisIsMySecret",
    resave: false,
    saveUninitialized: true    
}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

usePassport(app);
app.use((req, res, next)=>{
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.user = req.user;
    next();
});
app.use(routes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Serve Start on PORT ${PORT}`);
})