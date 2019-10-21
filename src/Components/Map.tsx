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

    markerDiv !: HTMLElement;

    constructor() {
        super({});
        this.state = { speed: 0, heading: 0, gheading: 0 };
        this.currentPosition = new google.maps.LatLng({ lat: 48.832380, lng: 2.234953 });
        this.previousPosition = new google.maps.LatLng({ lat: 48.832380, lng: 2.234953 });

        this.changeMarkerOverlay = this.changeMarkerOverlay.bind(this);
        this.applyDarkTheme = this.applyDarkTheme.bind(this);
        this.applyLightTheme = this.applyLightTheme.bind(this);
        this.updatePosition1 = this.updatePosition1.bind(this);
        this.updatePosition2 = this.updatePosition2.bind(this);
    }

    componentDidMount() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: this.currentPosition,
            mapTypeId: 'roadmap',
            zoom: 18,
            disableDefaultUI: true,
            styles: dark as google.maps.MapTypeStyle[],
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true
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
            markerLayer.innerHTML = '<div><div class="circle"></div><h1 class="speed">' + this.state.speed.toString() + ' km/h</h1></div>';
            markerLayer.style.width = 'auto';
            this.markerDiv = markerLayer.children[0] as HTMLElement;
            //this.markerDiv.innerHTML = '';

            // var circle = document.createElement('DIV');
            // circle.setAttribute('class', 'circle');
            // markerLayer.appendChild(circle);

            // var newMarker = document.createElement('H1');
            // newMarker.innerHTML = this.state.speed.toString() + ' km/h';
            // newMarker.setAttribute('class', 'speed');
            // newMarker.style.marginLeft = '20px';
            // markerLayer.appendChild(newMarker);
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

        heading = Math.round(window.google.maps.geometry.spherical.computeHeading(
            this.previousPosition,
            new google.maps.LatLng(position.coords.latitude, position.coords.longitude)));

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

        if (this.markerDiv) {
            this.markerDiv.style.webkitTransform = 'rotateZ(' + degs + 'deg)';
            this.markerDiv.style.transform = 'rotateX(30deg) rotateZ(' + degs + 'deg)';
        }

        var div = document.getElementById('map');
        if (div != null) {
            //div.style.webkitTransform = 'rotateZ(' + -degs + 'deg)';
            div.style.transform = 'rotateX(30deg) rotateZ(' + -degs + 'deg)';
        }

        // var orientedIcon = UserIndicator;
        // orientedIcon.rotation = this.state.heading;
        // this.userMarker.setIcon(orientedIcon);
    }

    applyDarkTheme() {
        this.map.setOptions({ styles: dark as google.maps.MapTypeStyle[] });
    }

    applyLightTheme() {
        this.map.setOptions({ styles: light as google.maps.MapTypeStyle[] });
    }

    render() {
        var maxSize = window.innerHeight >= window.innerWidth ? window.innerHeight : window.innerWidth;
        var mapStyle = { width: maxSize * 1.5, height: maxSize * 1.5, transform: 'rotateX(30deg)' };

        return (
            <div>
                <div className="map-container">
                    <div id="map" style={mapStyle}></div>
                    <div className="map-items">
                        <h1 className="speed">{this.state.speed ? this.state.speed * 3.6 : '--'} km/h</h1>
                        
                        <h3 className="speed">Angle {this.state.heading ? this.state.heading : '--'}°/{this.state.gheading ? this.state.gheading : '--'}° </h3>
                        <button onClick={this.changeMarkerOverlay}>Use advanced marker</button>
                        <br/>
                        <button onClick={this.applyDarkTheme}>Dark</button>
                        <button onClick={this.applyLightTheme}>Light</button> 
                        <br/>                      
                        <button onClick={this.updatePosition1}>Position1</button>
                        <button onClick={this.updatePosition2}>Position2</button>
                    </div>
                </div>
            </div>
        );
    }

    updatePosition2() {
        this.positionUpdated({ coords: { latitude: 48.832515, longitude: 2.235443, heading: 60, accuracy: 0.001, speed: 60, altitude: 0, altitudeAccuracy: 0.001 }, timestamp: Date.now() })
    }

    updatePosition1() {
        this.positionUpdated({ coords: { latitude: 48.832380, longitude: 2.234953, heading: 60, accuracy: 0.001, speed: 60, altitude: 0, altitudeAccuracy: 0.001 }, timestamp: Date.now() })
    }
}





