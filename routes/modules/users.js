const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");

const User = require("../../models/users");

router.get("/login", (req, res)=>{
    let error = [];
    res.render("users/login", {error});
})

router.post("/login", 
passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}))

router.get("/logout", (req, res)=>{
    req.logOut();
    req.flash("success_msg", "您已成功登出");
    res.redirect("/users/login");
})

router.get("/register", (req, res)=>{
    let { name, email } = {};
    let error = [];
    res.render("users/register", { name, email, error});
})

router.post("/register", (req, res)=>{
    let { name, email, password, confirmPassword} = req.body;
    let error = [];
    if(!name || !email || !password || !confirmPassword){
        error.push("各欄位不得為空");
    }
    if(password !== confirmPassword){
        error.push("密碼確認錯誤");
    }
    if(error.length > 0){
        return res.render("users/register", {
                    error,
                    name,
                    email
                });
    }
    return User.findOne({email})
            .then(user=>{
                if(user){
                    error.push("此信箱已有人註冊");
                    res.render("users/register", { name, email, error });
                }else{
                    return bcrypt
                    .genSalt(10)
                    .then(salt=>{
                        return bcrypt.hash(password, salt)
                    })
                    .then(hash => {
                        User.create({ name, email, password: hash })
                    })
                    .then(() => {
                        req.flash("success_msg", "註冊成功，請登入");
                        res.redirect("/users/login")
                    })
                    .then(err => console.log(err))
                }
            })

})

module.exports = router;