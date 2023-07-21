const express = require("express");
const path = require("path");
const hbs = require("hbs")
require("../src/db/conn");
const register = require("./models/register");
const Register = require("./models/register");
const bsrypt = require("bcryptjs");


const app = express();
const port = process.env.PORT || 3000;

 const staic_path = path.join(__dirname,"../public");
 const templates_path = path.join(__dirname,"../templates/views");
 const partials_path = path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(staic_path));

app.set("view engine","hbs");
app.set("views",templates_path);
hbs.registerPartials(partials_path);

app.get("/", (req , res)=>{
    res.render("index");
});

//register
app.get("/register", (req , res)=>{
    res.render("register");
});
app.post("/register", async (req , res)=>{
    try{
        const password = req.body.password;
        const conpassword = req.body.conpassword;

        if(password === conpassword){
            const registerEmp = new Register({
                fisrtname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gander: req.body.gander,
                age: req.body.age,
                phone: req.body.phone,
                password: req.body.password,
                conpassword: req.body.conpassword
            })

            //password hash


           const registered =await registerEmp.save();
           res.status(201).render("login");

        }else{
            res.send("password not match");
        }
    }catch(err){
        res.status(400).send(err);
    }
    
});

//login
app.get("/login",(req , res)=>{
    res.render("login");
});

app.post("/login",async (req , res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email: email}); 

        const isMatch = await bsrypt.compare(password,useremail.password);


        if(isMatch){
             res.status(201).render("index");
        }else{
            res.send("Invalid Details!");
        }
    }catch(err){
        res.status("400").send("Invalid Details!");
    }
});


app.listen(port, ()=>{
    console.log(`server is running at port number ${port}`);
});