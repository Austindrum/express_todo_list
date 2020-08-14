const express = require("express");
const router = express.Router();

const Todo = require("../../models/todo");

router.get("/new", (req, res)=>{
    res.render("todos/new");
});

router.post("/", (req, res)=>{
    return Todo.create({ 
                title: req.body.title,
                comment: req.body.comment,
                isImportant: req.body.important === 'on' ? true : false,
                isComplete: false,
                createAt: new Date().getTime(),
                userId: req.user._id
            })
            .then(()=> res.redirect("/"))
            .catch(err => console.log(err));
})

router.get("/:id/edit", (req, res)=>{
    let _id = req.params.id;
    let userId = req.user._id;
    return Todo.findOne({_id, userId})
    .lean()
    .then(todo=> res.render("todos/edit", {todo}))
    .catch( err => console.log(err) )
});

router.put("/:id/todo_update", (req, res)=>{
    let _id = req.params.id;
    return Todo.findOne({ _id })
    .then(todo => {
        todo.isComplete = !todo.isComplete;
        todo.save();
        return res.json({message: "success"})
    })  
})

router.put("/:id", (req, res)=>{
    let _id = req.params.id;
    let userId = req.user._id;
    return Todo.findOne({ _id, userId })
        .then(todo => {
            todo.title = req.body.title;
            todo.comment = req.body.comment;
            todo.isImportant = req.body.important === "on" ? true : false;
            todo.createAt = new Date().getTime();
            return todo.save();
        })
        .then(()=>{
            res.redirect("/");
        })
        .catch(err => console.log(err))
});

router.delete("/:id", (req, res)=>{
    let _id = req.params.id;
    let userId = req.user._id;
    return Todo.findOne({ _id, userId })
    .then(todo => todo.remove())
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

module.exports = router;