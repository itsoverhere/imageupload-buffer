const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const fs = require("fs")
const hbs = require("hbs")
const btoa = require("btoa")

const {User} = require("./models/user.js")

mongoose.connect("mongodb://localhost:27017/imageupload-buffer", {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const urlencoder = bodyparser.urlencoded({
    extended: false
})

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads/')
    }
})
const upload = multer({ storage: storage });

const app = express()

app.set("view engine", "hbs")

hbs.handlebars.registerHelper('tobase64', function(buffer) {
  var b64 = btoa(buffer)
  return b64
})


app.get("/", (req,res)=>{
    console.log("GET /")
    User.find({}).then((docs)=>{
        res.render("index", {
            users: docs
        })
    }, (err)=>{
        console.error("USER Find ERROR: \n" + err)
    })
})

app.post("/register", upload.single('image'), urlencoder, (req, res)=>{
    console.log("POST /register")
    let user = new User({
        username : req.body.username,
    });
    user.img.data = fs.readFileSync(req.file.path)
    user.img.contentType = 'image/jpeg';
    
    user.save().then((doc)=>{
        console.log("USER Register: \n" + JSON.stringify(doc))
        res.redirect("/")
    }, (err)=>{
        console.error("USER Register ERROR: \n " + err)
    })
 })


app.listen(3000, ()=>{
    console.log("now listening to port 3000")
})
