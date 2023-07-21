const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const employeeSchema = new mongoose.Schema({
    fisrtname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    gander:{
        type: Number
    },
    age:{
        type: Number,
        required: true
    },
    phone:{
        type: Number,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    conpassword:{
        type: String,
        required: true
    }
});

employeeSchema.pre("save",async function(next){

    if(this.isModified("password")){

        // console.log(`the current password is ${this.password}`);user add
         this.password = await bcrypt.hash(this.password,10);
         console.log(`the current password is ${this.password}`); //after hashing
        this.conpassword = undefined;
        }
    
     next();
})

//create collection

const Register = new mongoose.model("Register",employeeSchema);

module.exports = Register;
