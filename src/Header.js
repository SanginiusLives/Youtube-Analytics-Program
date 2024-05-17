import React from "react";
import { Link } from 'react-router-dom';
import "./CSS/Header.css"
import Form from "./Form";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate()

    const handleFormSubmit = (id) => {
        // Navigate to the URL with the ID as a parameter
        navigate(`/${id}`);
    }


    return (
        <header>
            <div className="maxWidth header">
                <div className="flex">
                    {/* Use the Link component to navigate to the root URL */}
                    <Link to="/">
                        <h1>Youtube Video Analytics</h1>
                    </Link>
                    <div className="headerForm">
                    <Form handleFormSubmit={handleFormSubmit}/>
                    </div>
                    
                </div>
            </div>
        </header>
    );
}

export default Header;