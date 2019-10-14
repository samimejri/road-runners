import React, { Component } from 'react';
import { mapStyle } from '../Ressources/MapStyle';
import { UserIndicator } from '../Ressources/icons';

declare global {
    interface Window { google: any; }
}
window.google = window.google || {};

const style = {
    width: "100vw",
    height: "100vh",
};

interface mapState {
    speed: number | null
}

interface Position {
    lat: number,
    lng: number
}

interface UserGeocode {
    position: Position,
    direction: number
}

export class Map extends Component<{}, mapState> {
    constructor(){
        super({});
        this.state = {speed: 0};
    }

    componentDidMount() {
        var initialPosition = { lat: 48.832380, lng: 2.234953 };

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
            // scaledSize: new window.google.maps.Size(100, 100),
            // origin: new window.google.maps.Point(0.5, 0.5),
            // anchor: new window.google.maps.Point(50, 50),
            map: map
        });

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    marker.setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
                    map.panTo({ lat: position.coords.latitude, lng: position.coords.longitude });
                    this.setState({
                        speed: position.coords.speed
                    });
                },
                () => { alert("Failed to pan to new position!!!"); },
                { enableHighAccuracy: true, maximumAge: 0, timeout: 1000 }
            );
        }
    }

    render() {
        return (
            <div>
                <div id="map" style={style}></div>
                <div>
                    <h2>{this.state.speed ? this.state.speed * 3.6 : 'NA'}</h2>
                </div>
            </div>
        );
    }
}





