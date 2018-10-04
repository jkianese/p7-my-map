import React, { Component } from 'react';
// import axios from 'axios';

class MyMap extends Component {
    
    // Set Constructor and State
    constructor(props) {
        super(props);
        this.state = {
            venues: []
        };
        this.initMap = this.initMap.bind(this);
    }
  
    componentDidMount() {
      this.getVenues()
      // this.loadMap()
    }
  
    loadMap = () => { 
        // scriptSrc();
        window.initMap = this.initMap
    }

    
    initMap = () => {

        let google = window.google
        // create a map 
        const map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 40.448506, lng: -80.002501},
            zoom: 14
        })
        // create an infowindow
        let infowindow = new google.maps.InfoWindow()
        
        // display dynamic markers
        // eslint-disable-next-line
        this.state.venues.map(myVenue => {

        let contentString = `${myVenue.venue.name}` 

        let marker = new google.maps.Marker({
        position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
        map: map,
        title: myVenue.venue.name
        })

        // click on a marker
        marker.addListener('click', function() {   
            // Change the Content
            infowindow.setContent(contentString)
            // Open an InfoWindow
            infowindow.open(map, marker)
        })
    });  
      
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

export default MyMap