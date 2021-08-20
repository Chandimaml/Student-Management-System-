//import dependencies 
//seems like import pakages and assign to variable such as java,c,c++.
//ECS6starnderd 
//import EXPRESS from "express"
const express = require("express");//web frame work for node
 
 

const cors =require("cors");/*cors is a node js package for providing a connect/express middle ware that can
                                  be used enable cors with varius options*/

const dotenv = require("dotenv");/*dotenv is a zero dependency module 
                                that loads environment variabales from a .env fille into process.env storing configuration in the environment
                                separate from code is based on The Twell-Factor app methodology*/

const connectDB=require("./config/db");
connectDB();
const app = express();

require("dotenv").config();

const errorHandler = require("./middleware/error");


//define a port for server
const PORT =process.env.PORT || 8070;//actually process.env.port is inbuilt


app.use(cors());
app.use(express.json());//pass various different custom JSON type as JSON.

/*deffine database URL for mongodb
const URL =process.env.MONGODB_URL;

mongoose.connect(URL,{//deffine connection
   useNewUrlParser:true,
   useUnifiedTopology:true,
   useFindAndModify:false,
   useCreateIndex:true

});

const connection= mongoose.connection;//assign database connection for a constant variable.
connection.once("open",()=>{//open connection for one time.
    console.log("MongoDB connection successful!");//display message in console when the connection successfull.
}); */

app.listen(PORT,()=>{
    console.log(`server is up and running on port number: ${PORT}`);
})
const StudentRouter = require("./routes/student.js");//import router
        //student
//methanin thamai users ganne postman eke get users gahanna. 
app.use("/user",StudentRouter);//this catch frontend url http://localhost:8070/student

//this catches front-end Url
//http://localhost/8070/student
app.use("/api/auth",require("./routes/auth"));
//app.use("/api/private",require("./routes/private"));


 
//Error Handler (Should be the last piece of middleware)
app.use(errorHandler);

