import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
import MyMap from './components/MyMap'

class App extends Component {
  
  render () {

    return (
      <div>
        {/*<h1 className="heading"> Pittsburgh, PA </h1>*/}
        <MyMap  />
      </div>
    );
  }
}
export default App