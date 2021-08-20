 
 import React from "react";
 import Header from "./component/Header";
 import Footer from "./component/Footer";
 import Home from "./component/Home";
 import AddStudent from "./component/AddStudent";
 import {BrowserRouter as Router,Route} from "react-router-dom";

export default function App() {
  return (
    <Router> 
    <div className="App">
      
       <Header/>
      <Route path= "/add" exact component={AddStudent}></Route>
      <Route path= "/" exact component={Home}></Route> 
       <Footer/>
       
    </div>
    </Router>
  );
}

 
