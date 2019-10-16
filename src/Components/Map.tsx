import React, { Component } from 'react';
// import { mapStyle } from '../Ressources/MapStyle';
import { UserIndicator } from '../Ressources/icons';

declare global {
    interface Window { google: any; }
}
window.google = window.google || {};

interface mapState {
    speed: number | null,
    heading: number
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
            //styles: mapStyle
        });

        var marker = new window.google.maps.Marker({
            position: initialPosition,
            icon: UserIndicator,
            fillColor: "White",
            optimized: false,
            map: map
        });

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    if (position.coords.speed && position.coords.speed > 5) {
                        marker.setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
                        map.panTo({ lat: position.coords.latitude, lng: position.coords.longitude });

                        var heading = Math.round(window.google.maps.geometry.spherical.computeHeading(
                            new google.maps.LatLng(previousPosition.lat, previousPosition.lng),
                            new google.maps.LatLng(position.coords.latitude, position.coords.longitude)));

                        var orientedIcon = UserIndicator;
                        orientedIcon.rotation = heading;
                        marker.setIcon(orientedIcon);

                        this.rotateMap(heading);

                        this.setState({
                            speed: position.coords.speed,
                            heading: heading
                        });
                    }
                    previousPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
                },
                () => { alert("Failed to pan to new position!!!"); },
                { enableHighAccuracy: true, maximumAge: 0, timeout: 1000 }
            );
        }
    }

    rotateMap(degs: number) {
        var div = document.getElementById('map');
        if (div != null) {
            //div.style.webkitTransform = 'rotate(' + degs + 'deg)';
            div.style.transform = 'rotate(' + degs + 'deg)';
        }
    }

    render() {
        var maxSize = window.innerHeight >= window.innerWidth ? window.innerHeight : window.innerWidth;
        var mapStyle = { width: maxSize * 1.5, height: maxSize * 1.5 };

        return (
            <div>
                <div className="map-container">
                    <div id="map" style={mapStyle}></div>
                </div>
                <div>
                    <h2>{this.state.speed ? this.state.speed * 3.6 : '--'} km/h</h2>
                    <h2>{this.state.heading}°</h2>
                </div>
            </div>
        );
    }
}





