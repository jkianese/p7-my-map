import React, { Component } from 'react';
import axios from 'axios';

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
        scriptSrc();
        window.initMap = this.initMap
    }

    getVenues = () => {
      const endPoint = "https://api.foursquare.com/v2/venues/explore?"
      const parameters = {
        client_id: "F1BIU3KU3RZFBQKCLKJ2MX1AT2ZRZFYRUXTJUMFGA1YUS5ZF",
        client_secret: "N1HLP0MSWYJJATAS3CBQTTSZ2WLME5RB2TAUWHGE2UXZ5A1E",
        //section: "topPicks",
        query: "arts",
        ll: "40.448506, -80.002501",
        limit: "10",
        v: "20181012"
      }
      // npm install axios to run
      axios.get(endPoint + new URLSearchParams(parameters))
        .then(response => {
          this.setState({
            venues: response.data.response.groups[0].items
          }, this.loadMap())
        })
        .catch(error => {
          console.log("Error: " + error)
        })
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

function scriptSrc() {
  let index = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBj5AzHYC1kUPRnvaT6G6zsAONHSpKmoqQ&callback=initMap'
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default MyMap