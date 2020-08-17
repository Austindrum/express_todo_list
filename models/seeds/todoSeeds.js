const bcrypt = require("bcrypt");
const db = require("../../config/db");
const Todo = require("../todo");
const User = require("../users");
if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}
const SEED_USER = {
    name: "root",
    email: "root@gmail.com",
    password: "123123"
}

db.once('open', ()=>{
    bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash      
    }))
    .then(user=>{
        const userId = user._id;
        return Promise.all(
            Array.from(
                { length: 10 },
                (_, i) => Todo.create({
                    title: `Todo-${i}`,
                    comment: "comment",
                    isImportant: true,
                    isComplete: false,
                    createAt: new Date().getTime(),
                    userId
                })
            )
        )
        // return Promise.all([
        //     Todo.create({
        //         userId,
        //         title: `Todo-3`,
        //         isImportant: true,
        //         isComplete: false,
        //         createAt: new Date().getTime(),
        //     })])
    })
    .then(()=>{
        console.log("Done...");
        process.exit();
    })
})