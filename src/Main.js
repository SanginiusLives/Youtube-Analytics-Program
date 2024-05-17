import React from "react";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import "./CSS/Main.css";

function Main () {
    const navigate = useNavigate()

    const handleFormSubmit = (id) => {
        // Navigate to the URL with the ID as a parameter
        navigate(`/${id}`);
    }

        return (
            <div className="maxWidth">
            <div className="center">
            <h2>Enter A Youtube Video Link And See Its Stats!</h2>

            <Form handleFormSubmit={handleFormSubmit}/>
            </div>
                
              
            </div>
        )
    
}
export default Main;