import React, { Component } from 'react';

class MyMap extends Component {

    // Set Constructor and State
    constructor(props) {
        super(props);
        this.state = {
            venues: []
        };
        // this.initMap = this.initMap.bind(this);
    }
  
    componentDidMount() {
        // this.getVenues()
        this.loadMap()
    }
  
    loadMap = () => { 
        scriptSrc();
        window.initMap = this.initMap.bind(this);  // may not need .bind(this)
    }

    initMap = () => {
        // let google = window.google
        // create a map 
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 28.385299, lng: -81.563874},
            zoom: 14,
            
        })
    }

    render () {
        return (
          <main>
            <div role="application" id="map">
        
            </div>
          </main>  
        )
      }
}

function scriptSrc() {
    let index = window.document.getElementsByTagName("script")[0]
    let script = window.document.createElement("script")
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBj5AzHYC1kUPRnvaT6G6zsAONHSpKmoqQ&callback=initMap'
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}

export default MyMap



