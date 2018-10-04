import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';// import MyMap from './components/MyMap'
import FourSquare from './api/FourSquare'

class App extends Component {

  componentDidMount() {
    FourSquare.search({
      near: "Pittsburgh, PA",
      query: "tacos",
      limit: 10
    }).then(results => console.log(results));
  }
  
  render () {

    return (
      <div>
        {/*<h1 className="heading"> Pittsburgh, PA </h1>*/}
        {/* <MyMap  /> */}
      </div>
    );
  }
}
export default App