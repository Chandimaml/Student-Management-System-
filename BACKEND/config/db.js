const mongoose =require("mongoose");

require("dotenv").config();
const dbConfig =async ()=>{
    try {
        //deffine database URL for mongodb
            const URL =process.env.MONGODB_URL;

           await mongoose.connect(URL,{//deffine connection
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true

            });

            const connection= mongoose.connection;//assign database connection for a constant variable.
            connection.once("open",()=>{//open connection for one time.
                console.log("MongoDB connection successful!");//display message in console when the connection successfull.
            }); 

        
    } catch (error) {
        console.error("mongodb connection failed");
        
    }
}
module.exports= dbConfig;