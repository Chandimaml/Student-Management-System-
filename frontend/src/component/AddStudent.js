import React,{useState} from "react";//import useStates for keep states
import axios from "axios";//import axios for backend routes handling
export default function  AddStudent(){


  const [name ,setName] = useState("");
  const [age ,setAge]   =useState("");
  const [gender,setGender]=useState("");
  const [loading,setLoading]=useState(false);
  const [isError,setIsError]=useState(false);

  function sendData(e){
    e.preventDefault();/*the prevent default() method cancels if it is cancelable,
                        meaning that the default action that belongs to the event will not occur.
                         for example,this is can be useful when clicking on"submit" button, prevent it from submitting a form.*/
    setLoading(true);
    setIsError(false);//additinal

    const newStudent ={name,age,gender};

    axios.post("http://localhost:8070/student/add",newStudent).then(()=>{//backend add rotue handler
      alert("student added");//js alert
      setName('');//set initial state
      setAge('');
      setGender('');
      setLoading(false);
        }).catch((err)=>{
           alert(err);
           setLoading(false);
           setIsError(true);
        })

}

  
    return(
        <div className="container">
             <form onSubmit ={sendData}>
             <div className="mb-3">
             <label for="name" className="form-label">student name</label>

             <input type="text" className="form-control" id="name" placeholder="Enter student name"
             value={name}//set value
              onChange={(e)=>{
                setName(e.target.value);//javaScript event handling
              }}
              required
              />
              </div>

        
            <div className="mb-3">
              <label for="age" className="form-label">Age</label>
               <input type="text" className="form-control" id="age" placeholder="Enter student age"
               value={age}//set value
               onChange={(e)=>{
                 setAge(e.target.value);//javaScript event handling
               }}
               required
               />
              </div>


                <div className="mb-3">
                 <label for="gender" className="form-label">gender</label>
                <input type="text" className="form-control" id="gender" placeholder="Enter student gender"
                value={gender}//set value
                onChange={(e)=>{
                  setGender(e.target.value);//javaScript event handling
                }}
                required
                />
                </div>


                <div className="mb-3 form-check"/>
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" for="exampleCheck1">Check me out</label>
   
                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Submiting..':'submit'}
                </button> 
             </form>
        </div>
    )
}

     