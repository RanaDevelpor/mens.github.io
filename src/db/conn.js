const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/register",{
    // useNewUrlParder:true,
    // useUnifiedTopology:true,
    // useCreateIndex:true
}).then(() =>{
    console.log(`connection seccessful`);
}).catch((err) => {
    console.log(`connaction Failed!`);
});