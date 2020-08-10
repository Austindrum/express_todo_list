const express = require("express");
const router = express.Router();

const Todo = require("../../models/todo");


router.get("/", (req, res)=>{
    let userId = req.user._id;
    let error = [];
    Todo.find({userId})
    .lean()
    .sort({ createAt: 'asc' })
    .then(todos=> res.render("index", { todos, error }) )
    .catch( err=> console.log(err) )
})
module.exports = router;