// require defult modules
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const app = express();



// require custmer modules
const routes = require("./routes");
require("./config/db");

// set ejs
app.set("view engine", "ejs");

app.use(methodOverride('_method'));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Serve Start on PORT ${PORT}`);
})