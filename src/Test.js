import React, { Component } from "react";
import ApiHelper from "./Api";

class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.apiHelper = new ApiHelper('AIzaSyANvP8iHyWi53UlIOZZuweL3OeXW3I2Y8I');
  }
  
  async componentDidMount() {
    try {
      const data = await this.apiHelper.fetchData('someEndpoint', { param1: 'value1' });
      console.log('Data:', data); // Log the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  render() {
    return (
      <div>
        <p>Hello</p>
      </div>
    );
  }
}

export default TestComponent;
