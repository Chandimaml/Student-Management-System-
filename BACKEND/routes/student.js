//frontend routes catches
const router = require ("express").Router();//import router
//const { request } = require("express");
const multer =require("multer");
const {v4:uuid4}=require("uuid");
let path= require('path');
let Student = require ("../models/student") ;
let User =require ('../models/student');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'../frontend/public/images');
    },
    fileName: function(req,file,cb){
        cb(null,uuid4()+'_'+Date.now()+path.extname(file.originalName));

    }


});
const fileFilter =(req,file,cb)=>{
    const allowedFileTypes=['image/jpeg','image/jpg','image/png'];
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null,true);

    }else{
        cb(null,false);

    }
}
let upload=multer({storage,fileFilter});

router.route('/add').post(upload.single('photo'),(res,req)=>{
    const name=req.body.name;
    const age=Number(req.body.age);
    const gender=req.body.gender;
    const birthdate= req.body.birthdate;
    const photo=req.file.fileName;
    
    const newUserData ={
        name,
        age,
        gender,
        birthdate,
        photo
    }

    const newUser= new User(newUserData);
    newUser.save()
           .then(()=> res.json('User Added'))
           .catch(err=>res.status(400).json('Error: '+err));


});
//47
router.route("/").get((req,res)=>{//route display all
    User.find().then((students)=>{
        res.json(students);
    }).catch((err)=>{
        console.log(err);
    });
});
    
     
 
 


//http://localhost:8070/student/add
router.route("/add").post((req,res)=>{//route for create or insert
    const name = req.body.name;
    const age = Number(req.body.age);//without destructure method.//cast number format
    const gender =req.body.gender;

    const newStudent = new Student({
        name,
        age,
        gender
    })
    newStudent.save().then(()=>{
        res.json("Student is added")
    }).catch((err)=>{
        console.log(err);//exception handling.
    })
})

//http://localhost:8070/student
router.route("/").get((req,res)=>{//display all
    Student.find().then((students)=>{
        res.json(students)
    }).catch((err)=>{
        console.log(err)
    })
})
//http://localhost:8070/student/update/543215f3gqbydh
router.route("/update/:id").put(upload.single('photo'),async(req,res)=>{//update data
    let userID = req.params.id
    const name =req.body.name;
    const age =req.body.age;
    const gender=req.body.gender;
    const birthdate=req.body.birthdate;
    const photo =req.file.filename;


   // const{ name, age,gender}=req.body;//destructure method
    
    const updateStudent = {
        name,
        age,
        gender,
        birthdate,
        photo

    };
          //Student
    await User.findByIdAndUpdate(userID,updateStudent).then(()=>{
      res.status(200).send({status:"user updated"})

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error with updating data",error:err.message});
    });
});

//delete

router.route("/delete/:id").delete(async(req,res)=>{

    let userID = req.params.id;

    await User.findByIdAndDelete(userID).then(()=>{
        res.status(200).send({Status:"user has successfully deleted"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error with deleting data",error:err.message});
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let userID =req.params.id;
    await User.findById(userID).then((students)=>{
        /*res.status(200).send({status:"successfull"})*/
        res.json(students)
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error with get data"});
    })
})
module.exports = router;

























module.exports=router;