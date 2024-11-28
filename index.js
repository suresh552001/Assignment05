const express=require("express");
const app =express();
require('dotenv').config()
console.log(process.env.PORT)
const userRoute=require("./routes/userRoutes");
const notesRoute=require("./routes/notesRoutes");



const ConnectDB=require("./config/db");
ConnectDB();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello Sorld");

})
app.use("/api/user",userRoute);
app.use("/api/notes",notesRoute);

app.listen(process.env.PORT,()=>{
    console.log(`start the server:${process.env.PORT}`);
})