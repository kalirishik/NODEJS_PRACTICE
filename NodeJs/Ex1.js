import express from 'express';
const app=express();
const port=3500;
app.listen(port,()=>{
    console.log(`Server running on port :${port}`)
});
app.get("/",(req,res)=>{
    res.send("<h3>Hi user, You are accessing the following URL</h3><p>URL: <a href='http://localhost:3500/login'>http://localhost:3500/login</a></p>");
})
app.get("/login",(req,res)=>{
    res.send("GET method")
})
