
require("dotenv").config();
const express=require('express');
const cors=require('cors');
const app=express();
const authRoute=require("./router/auth-router");
const contactRoute=require("./router/contact-router")
const serviceRoute=require("./router/service-router")
const adminRoute=require("./router/admin-router");

const connectDb=require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");


//Let's tackle cors
const corsOptions={
    origin:"https://tech-solutions-inc-1.onrender.com",
    methods:"GET,POST,DELETE,PUT,PATCH,HEAD",
    credentials:true,
}
app.use(cors(corsOptions));


app.use(express.json());

//Mount the Router:To use the router in your main Express app, u can mount  it at a specific url prefix
app.use("/api/auth",authRoute);

app.use("/api/form",contactRoute);
app.use("/api/data",serviceRoute);

//admin route
app.use("/api/admin",adminRoute);




app.use(errorMiddleware);

const PORT=5000;

connectDb().then(()=>{
app.listen(PORT,()=>{
    console.log(`server is running at port:${PORT}`);
});
});
