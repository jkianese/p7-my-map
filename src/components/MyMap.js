import React, { Component } from 'react';
import FourSquare from '../api/FourSquare' // .. (two dots to go back to a folder)

class MyMap extends Component {

    // Set Constructor and State
    constructor(props) {
        super(props);
        this.state = {
            favPlaces: [ // Our Favorite DW Places
                {name: "Splash Mountain", location: {lat: 28.419425, lng: -81.585062}},
                {name: "Space Mountain", location: {lat: 28.419278, lng: -81.578037}},
                {name: "Haunted Mansion", location: {lat: 28.420424, lng: -81.582883}},
                {name: "Toy Story Mania!", location: {lat: 28.356365, lng: -81.561508}},
                {name: "Expedition Everest", location: {lat: 28.358982, lng: -81.587155}},
                {name: "Twilight Zone Tower of Terror", location: {lat: 28.360344, lng: -81.559917}},
                {name: "Mission: Space", location: {lat: 28.374235, lng: -81.547006}},
                {name: "Cinderella's Royal Table", location: {lat: 28.419722, lng: -81.581232}},
                {name: "Be Our Guest", location: {lat: 28.421364, lng: -81.580714}},
                {name: "Sci-Fi Dine-In Theater", location: {lat: 28.355898, lng: -81.559725}},
            ],
            // query: '', // Do I need query?
            // venues: [], // Keep for now, may not need this
            map: '',
            infowindow: '',
            prevmarker: ''
        };
        this.initMap = this.initMap.bind(this); // have this in initMap as well
        // this.openInfoWindow = this.openInfoWindow.bind(this);
        // this.closeInfoWindow = this.closeInfoWindow.bind(this);
    }
  
    componentDidMount() {
        window.initMap = this.initMap;
        scriptSrc();
        // this.getVenues()
        // this.loadMap()
        FourSquare.search({
            near: "Disney World",
            query: "food",
            limit: 10
          }).then(results => console.log(results));
    }
    /*
    loadMap = () => { 
        window.initMap = this.initMap.bind(this);  // may not need .bind(this)
        scriptSrc();
    }
    */
    initMap = () => {
        let google = window.google
        
        // create a map and center 
        const map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 28.385299, lng: -81.563874},
            zoom: 12,
            // mapTypeControl: false // see what this does
        });

        let InfoWindow = new window.google.maps.InfoWindow({});

        window.google.maps.event.addListener(InfoWindow, 'closeclick', function () {
            this.closeInfoWindow();
        });


        this.setState({
            'map': map,
            'infowindow': InfoWindow
        })
        /* Included in referenced code, don't know that I need any of this
        window.google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            window.google.maps.event.trigger(map, "resize");
            this.state.map.setCenter(center);
        });
        */

        window.google.maps.event.addListener(map, 'click', function () {
            this.closeInfoWindow();
        });

        this.state.favPlaces.forEach((location, ind) => {
            const marker = new google.maps.Marker({
                position: {lat: location.location.lat, lng: location.location.lng},
                animation: window.google.maps.Animation.DROP,
                map: map,
            })

            marker.addListener('click', function () {
                this.openInfoWindow(marker);
            });
            // location.longname = longname;
            location.marker = marker;
            location.display = true;
            this.state.favPlaces.push(location); // code ref did not have this.state
        });
        this.setState({
            'favPlaces': this.favPlaces
        });
    } 
    
    // Code broke after I add this on marker click -- Line 91 call to openInfoWindow    
    openInfoWindow(marker) {
        this.closeInfoWindow();
        this.state.infowindow.open(this.state.map, marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        this.setState({
            'prevmarker': marker
        });
        this.state.infowindow.setContent('Loading Data...');
        this.state.map.setCenter(marker.getPosition());
        this.state.map.panBy(0, -200);
        // this.getMarkerInfo(marker);
    }
      
    getMarkerInfo(marker) {
        // Code Ref - Foursquare Info is here
        // Can I Link mine here to my FourSquare.js component???
    }

    closeInfoWindow() {
        if (this.state.prevmarker) {
            this.state.prevmarker.setAnimation(null);
        }
        this.setState({
            'prevmarker': ''
        });
        this.state.infowindow.close();
    }

    render () {
        return (
          <main>        
            <div role="application" id="map"></div>
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
    script.onerror = function() {
        document.write("Error: Google Maps can't be loaded");
    }
    index.parentNode.insertBefore(script, index)

}

export default MyMap