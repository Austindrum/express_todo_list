const express = require("express");
const router = express.Router();

const Todo = require("../../models/todo");

router.get("/", (req, res)=>{
    Todo.find().lean()
    .sort({ createAt: 'asc' })
    .then(todos=> res.render("index", { todos }) )
    .catch( err=> console.log(err) )
})
module.exports = router;