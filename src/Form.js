import React, { Component } from "react";
import "./CSS/Form.css";

class Form extends Component {
    state = {
        url: ''
    }
    

    //Change url value on form change in input for header and main page
    handleChange = event => {
        this.setState({
            url: event.target.value
        });
    }

    //Get id from Youtube Video Url to pass up.
    handleSubmit = event => {
        event.preventDefault();
        const urlObj = new URL(this.state.url);
        const vParam = urlObj.searchParams.get('v');
        this.props.handleFormSubmit(vParam);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Video ID" type="text" value={this.state.url} onChange={this.handleChange}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Form;
