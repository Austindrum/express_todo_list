const express = require("express");
const router = express.Router();

const User = require("../../models/users");

router.get("/login", (req, res)=>{
    res.render("users/login");
})
router.get("/register", (req, res)=>{
    let { name, email } = {};
    res.render("users/register", { name, email});
})

router.post("/register", (req, res)=>{
    let { name, email, password, confirmPassword} = req.body;
    return User.findOne({email})
            .then(user=>{
                if(user){
                    console.log("user exists");
                    res.render("users/register", { name, email });
                }else{
                    if(password !== confirmPassword){
                        console.log("password not confirm");
                        res.render("users/register", { name, email });
                    }else{
                        User.create({ name, email, password })
                        .then(() => res.redirect("/users/login"))
                        .then(err => console.log(err))
                    }
                }
            })
})

module.exports = router;