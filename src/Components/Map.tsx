import React, { Component } from 'react';
import { dark, light } from '../Ressources/MapStyle';
import { UserIndicator } from '../Ressources/icons';

interface mapState {
    speed: number,
    heading: number,
    gheading: number
}

export class Map extends Component<{}, mapState> {
    currentPosition!: google.maps.LatLng;
    previousPosition!: google.maps.LatLng;

    map!: google.maps.Map;
    userMarker!: google.maps.Marker;
    shadowMarker!: google.maps.Marker;

    constructor() {
        super({});
        this.state = { speed: 0, heading: 0, gheading: 0 };
        this.currentPosition = new google.maps.LatLng({ lat: 48.832380, lng: 2.234953 });

        this.changeMarkerOverlay = this.changeMarkerOverlay.bind(this);
        this.applyDarkTheme = this.applyDarkTheme.bind(this);
        this.applyLightTheme = this.applyLightTheme.bind(this);
    }

    componentDidMount() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: this.currentPosition,
            mapTypeId: 'roadmap',
            zoom: 18,
            disableDefaultUI: true,
            styles: dark as google.maps.MapTypeStyle[]
        });

        this.userMarker = new google.maps.Marker({
            position: this.currentPosition,
            icon: UserIndicator,
            optimized: false,
            map: this.map
        });

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    this.positionUpdated(position);
                },
                () => {
                    alert("Failed to pan to new position!");
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 500
                }
            );
        }
        
        var overlay = new google.maps.OverlayView();
        overlay.draw = function () {
            this.getPanes().markerLayer.id = 'markerLayer';
        };

        overlay.setMap(this.map);
    }

    changeMarkerOverlay() {
        var markerLayer = document.getElementById("markerLayer")
        if (markerLayer) {
            //markerLayer.style.width = 'auto';
            markerLayer.children[1].innerHTML = '';

            var circle = document.createElement('DIV');
            circle.setAttribute('class', 'circle');
            markerLayer.children[1].appendChild(circle);

            var newMarker = document.createElement('H1');
            newMarker.innerHTML = this.state.speed.toString()+' km/h';
            newMarker.setAttribute('class', 'speed');
            markerLayer.children[1].appendChild(newMarker);
        }
    }

    positionUpdated(position: Position) {

        this.userMarker.setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
        this.map.panTo({ lat: position.coords.latitude, lng: position.coords.longitude });

        var heading: number = 0;
        var gheading: number = 0;

        if (position.coords.heading) {
            gheading = position.coords.heading;
        }
        else {
            heading = Math.round(window.google.maps.geometry.spherical.computeHeading(
                this.previousPosition,
                new google.maps.LatLng(position.coords.latitude, position.coords.longitude)));
        }

        var orientedIcon = UserIndicator;
        orientedIcon.rotation = heading;
        this.userMarker.setIcon(orientedIcon);

        this.rotateMap(heading);

        if (position.coords.speed && heading && gheading)
            this.setState({
                speed: Math.round(position.coords.speed),
                heading: heading,
                gheading: gheading
            });

        this.previousPosition = new google.maps.LatLng({ lat: position.coords.latitude, lng: position.coords.longitude });
    }

    rotateMap(degs: number) {
        var div = document.getElementById('map');
        if (div != null) {
            div.style.webkitTransform = 'rotateX(45deg) rotateZ(' + -degs + 'deg)';
            div.style.transform = 'rotateX(45deg) rotateZ(' + -degs + 'deg)';
        }
    }

    applyDarkTheme() {
        this.map.setOptions({styles: dark as google.maps.MapTypeStyle[]});
    }

    applyLightTheme() {
        this.map.setOptions({styles: light as google.maps.MapTypeStyle[]});
    }

    render() {
        var maxSize = window.innerHeight >= window.innerWidth ? window.innerHeight : window.innerWidth;
        var mapStyle = { width: maxSize * 1.5, height: maxSize * 1.5, transform: 'rotateX(45deg)' };

        return (
            <div>
                <div className="map-container">
                    <div id="map" style={mapStyle}></div>
                    <div className="map-items">
                        <h1 className="speed">{this.state.speed ? this.state.speed * 3.6 : '--'} km/h</h1>
                        <button onClick={this.changeMarkerOverlay}>Use advanced marker</button>
                        <button onClick={this.applyDarkTheme}>Dark</button>
                        <button onClick={this.applyLightTheme}>Light</button>
                    </div>
                </div>
                <h3>Calculated heading: {this.state.heading ? this.state.heading : '--'} °</h3>
                <h3>Google heading: {this.state.gheading ? this.state.gheading : '--'} °</h3>
            </div>
        );
    }
}





