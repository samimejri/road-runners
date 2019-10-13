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

interface Position {
    lat: number,
    lng: number
}

interface UserGeocode {
    position: Position,
    direction: number
}

export class Map extends Component {
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
            map: map
        });

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    marker.setPosition({lat: position.coords.latitude, lng:position.coords.longitude});
                    map.panTo({lat: position.coords.latitude, lng:position.coords.longitude});
                },
                () => { alert("Failed to pan to new position!!!");},
                { enableHighAccuracy: true, maximumAge: 0, timeout: 1000 }
            );

            // navigator.geolocation.getCurrentPosition(
            //     function (position) {
            //         pos.lat = position.coords.latitude;
            //         pos.lng = position.coords.longitude;
            //         map.setCenter(pos);
            //     },
            //     function () {
            //     },
            //     { enableHighAccuracy: true, maximumAge: 10000 }
            // );
        }
    }

    render() {
        return (
            <div id="map" style={style}></div>
        );
    }
}





