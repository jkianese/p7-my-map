import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';// import MyMap from './components/MyMap'
import MyMap from './components/MyMap'
import FourSquare from './api/FourSquare'

class App extends Component {

  componentDidMount() {
    FourSquare.search({
      near: "Disney World",
      query: "food",
      limit: 10
    }).then(results => console.log(results));
  }
  
  render () {

    return (
      <main>
        <div id="map">
        {/*<h1 className="heading"> Pittsburgh, PA </h1>*/}
         <MyMap  />
      </div>
      </main>
    );
  }
}
export default App