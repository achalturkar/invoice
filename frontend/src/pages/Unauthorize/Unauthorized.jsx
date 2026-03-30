import React from "react";
import { Link } from "react-router-dom";


const Unauthorized = () => {
return (

  <div className="h-screen flex flex-col items-center  justify-center ">
    <h1 className=" text-red-600 text-xl">
      You are not authorized to access this page
    </h1>
    <Link to="/">
     <h1 className="text-blue-600">
      Got to Home
      </h1>
    </Link>


  </div>



)};

export default Unauthorized;