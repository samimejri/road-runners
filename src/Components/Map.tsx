import React, { Component } from 'react';
import { dark, light } from '../Ressources/MapStyle';
import { UserIndicator } from '../Ressources/icons';

interface mapState {
    speed: number,
    heading: number
}

const perspectiveTransform = 'rotateX(45deg) ';

export class Map extends Component<{}, mapState> {
    currentPosition!: google.maps.LatLng;
    previousPosition!: google.maps.LatLng;

    map!: google.maps.Map;
    userMarker!: google.maps.Marker;
    shadowMarker!: google.maps.Marker;

    markerDiv !: HTMLElement;
    isAdvancedMarkerOn: boolean;

    constructor() {
        super({});
        this.state = { speed: 0, heading: 0 };
        this.currentPosition = new google.maps.LatLng({ lat: 48.832380, lng: 2.234953 });
        this.previousPosition = new google.maps.LatLng({ lat: 48.832380, lng: 2.234953 });
        this.isAdvancedMarkerOn = false;

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
        var markerLayer = document.getElementById("markerLayer");

        if (markerLayer) {
            this.isAdvancedMarkerOn = true;
            markerLayer.innerHTML = '<div><div id="circle" class="circle"></div><h1 id="speed" class="speed">' + this.state.speed + '</h1></div>';
            markerLayer.style.width = 'auto';
            this.markerDiv = markerLayer.children[0] as HTMLElement;
            this.rotateMap(this.state.heading);
        }
    }

    positionUpdated(position: Position) {

        this.userMarker.setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
        this.map.panTo({ lat: position.coords.latitude, lng: position.coords.longitude });

        var heading: number = 0;

        heading = Math.round(window.google.maps.geometry.spherical.computeHeading(
            this.previousPosition,
            new google.maps.LatLng(position.coords.latitude, position.coords.longitude)));

        if (position.coords.speed && heading)
            this.setState({
                speed: Math.round(position.coords.speed * 3.6),
                heading: heading
            });

        this.rotateMap(heading);

        this.previousPosition = new google.maps.LatLng({ lat: position.coords.latitude, lng: position.coords.longitude });
    }

    rotateMap(degs: number) {

        var div = document.getElementById('map');
        if (div != null) {
            div.style.webkitTransform = perspectiveTransform + 'rotateZ(' + -degs + 'deg)';
            div.style.transform = perspectiveTransform + 'rotateZ(' + -degs + 'deg) ';
        }

        if (this.isAdvancedMarkerOn) {
            if (this.markerDiv) {
                this.markerDiv.style.webkitTransform = 'rotateZ(' + degs + 'deg)';
                this.markerDiv.style.transform = 'rotateZ(' + degs + 'deg) ';
            }
        }
        else {
            var orientedIcon = UserIndicator;
            orientedIcon.rotation = degs;
            this.userMarker.setIcon(orientedIcon);
        }
    }

    applyDarkTheme() {
        this.map.setOptions({ styles: dark as google.maps.MapTypeStyle[] });
    }

    applyLightTheme() {
        this.map.setOptions({ styles: light as google.maps.MapTypeStyle[] });
    }

    render() {
        var maxSize = window.innerHeight >= window.innerWidth ? window.innerHeight : window.innerWidth;
        var mapStyle = { width: maxSize * 1.5, height: maxSize * 1.5, transform: perspectiveTransform };

        return (
            <div>
                <div className="map-container">
                    <div id="map" style={mapStyle}></div>
                    <div className="map-items">
                        <h1 className="speed">{this.state.speed ? this.state.speed: '--'} km/h</h1>

                        <h3 className="speed">Angle {this.state.heading ? this.state.heading : '--'}°</h3>
                        <button onClick={this.changeMarkerOverlay}>Use advanced marker</button>
                        <br />
                        <button onClick={this.applyDarkTheme}>Dark</button>
                        <button onClick={this.applyLightTheme}>Light</button>
                        <br />
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
        this.positionUpdated({ coords: { latitude: 48.832380, longitude: 2.234953, heading: 60, accuracy: 0.001, speed: 50, altitude: 0, altitudeAccuracy: 0.001 }, timestamp: Date.now() })
    }
}





