import React, { Component } from 'react';
import { mapStyle } from '../Ressources/MapStyle';
import { UserIndicator } from '../Ressources/icons';

declare global {
    interface Window { google: any; }
}
window.google = window.google || {};

const style = {
    width: "100vw",
    height: "70vh",
};

interface mapState {
    speed: number | null,
    heading: number
}

interface Position {
    lat: number,
    lng: number
}

interface UserGeocode {
    position: Position,
    direction: number,
}

export class Map extends Component<{}, mapState> {
    constructor() {
        super({});
        this.state = { speed: 0, heading: 0 };
    }

    componentDidMount() {        
        var initialPosition = { lat: 48.832380, lng: 2.234953 };
        var previousPosition = initialPosition;

        var map = new window.google.maps.Map(document.getElementById('map'), {
            center: initialPosition,
            mapTypeId: 'roadmap',
            zoom: 18,
            disableDefaultUI: true,
            styles: mapStyle
        });

        var marker = new window.google.maps.Marker({
            position: initialPosition,
            icon: UserIndicator,
            fillColor: "White",
            map: map
        });

        

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    marker.setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
                    map.panTo({ lat: position.coords.latitude, lng: position.coords.longitude });

                    var heading = window.google.maps.geometry.spherical.computeHeading(previousPosition, position.coords);                    
                    previousPosition = { lat: position.coords.latitude, lng: position.coords.longitude };

                    this.setState({
                        speed: position.coords.speed,
                        heading: heading
                    });
                },
                () => { alert("Failed to pan to new position!!!"); },
                { enableHighAccuracy: true, maximumAge: 0, timeout: 1000 }
            );
        }
    }

    // updateMap(Position position) {

    // }

    render() {
        return (
            <div>
                <div id="map" style={style}></div>
                <div>
                    <h2>{this.state.speed ? this.state.speed * 3.6 : '--'} km/h</h2>
                    <h2>{this.state.heading}°</h2>
                </div>
            </div>
        );
    }
}





