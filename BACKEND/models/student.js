//mongodb schema goes here.
//actually this is like an interface.

const mongoose= require("mongoose");
const Schema = mongoose.Schema;//access to the schema.

const newStudentSchema= new Schema({
    name :{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required: true
    },
    gender: {
        type:String,
        required: true
    },
    photo: {
        type:String,
        required: true
    },
    birthdate: {
        type:String,
        required: true
    }
    

    



})
                            //collection name
const Student = mongoose.model("Student",newStudentSchema);
module.exports = Student;
//const Image=mongoose.model('student',ImageSchema);
//module.exports = Images;