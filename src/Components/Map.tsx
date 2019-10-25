import React, { Component } from 'react';
import { dark, light } from '../Ressources/MapStyle';
import { Speedo } from './Speedo';
import { Marker } from './Marker';
import { UserIndicator } from '../Ressources/icons';

interface mapState {
    speed: number,
    heading: number,
    useAdvancedMarker: boolean
}

const perspectiveTransform = 'rotateX(45deg) ';

export class Map extends Component<{}, mapState> {
    currentPosition!: google.maps.LatLng;
    previousPosition!: google.maps.LatLng;

    map!: google.maps.Map;
    userMarker!: google.maps.Marker;
    shadowMarker!: google.maps.Marker;

    markerDiv !: HTMLElement | null;
    isAdvancedMarkerOn: boolean;

    constructor() {
        super({});
        this.state = { speed: 0, heading: 0, useAdvancedMarker: false };
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
                    timeout: 100
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
        this.markerDiv = document.getElementById("markerLayer");

        if (this.markerDiv) {
            this.markerDiv.innerHTML = '';
            this.markerDiv.style.width = "auto";
        }

        this.setState({ useAdvancedMarker: true });
        this.rotateMap(this.state.heading)
    }

    positionUpdated(position: Position) {
        var heading: number = 0;

        heading = Math.round(window.google.maps.geometry.spherical.computeHeading(
            this.previousPosition,
            new google.maps.LatLng(position.coords.latitude, position.coords.longitude)));

        this.rotateMap(heading);

        if (position.coords.speed && position.coords.speed > 3) {
            this.userMarker.setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
            this.map.panTo({ lat: position.coords.latitude, lng: position.coords.longitude });

            if (position.coords.speed && heading)
                this.setState({
                    speed: Math.round(position.coords.speed * 3.6),
                    heading: heading
                });

            this.previousPosition = new google.maps.LatLng({ lat: position.coords.latitude, lng: position.coords.longitude });
        }
    }

    rotateMap(degs: number) {

        var div = document.getElementById('map');
        if (div != null) {
            div.style.webkitTransform = perspectiveTransform + 'rotateZ(' + -degs + 'deg)';
            div.style.transform = perspectiveTransform + 'rotateZ(' + -degs + 'deg) ';
            div.style.transition = '0.5s linear';
        }

        if (this.state.useAdvancedMarker) {
            if (this.markerDiv) {
                this.markerDiv.style.webkitTransform = 'rotateZ(' + degs + 'deg)';
                this.markerDiv.style.transform = 'rotateZ(' + degs + 'deg) ';
                this.markerDiv.style.transformOrigin = "20% 25%";
                this.markerDiv.style.transition = '0.5s linear';
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

                        <Speedo Speed={this.state.speed} />

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

                <Marker useAdvanced={this.state.useAdvancedMarker}>
                    <Speedo Speed={this.state.speed} />
                </Marker>
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





