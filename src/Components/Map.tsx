import React, { Component, Fragment } from 'react';
import { dark, light } from '../Ressources/MapStyle';
import { Marker } from './Marker';
import { UserIndicator } from '../Ressources/icons';

interface mapState {
    heading: number,
    useAdvancedMarker: boolean
}

interface MapProps {
    UpdateSpeed: (speed: number) => void,
    DarkThemeEnabled: boolean,
    HUDEnabled: boolean
}

const perspectiveTransform = 'rotateX(45deg) ';

export class Map extends Component<MapProps, mapState> {
    currentPosition!: google.maps.LatLng;
    previousPosition!: google.maps.LatLng;

    map!: google.maps.Map;
    userMarker!: google.maps.Marker;
    shadowMarker!: google.maps.Marker;

    markerDiv !: HTMLElement | null;
    isAdvancedMarkerOn: boolean;

    mapRendered: boolean;

    constructor(props: MapProps) {
        super(props);
        this.state = { heading: 0, useAdvancedMarker: false };
        this.currentPosition = new google.maps.LatLng({ lat: 48.832380, lng: 2.234953 });
        this.previousPosition = new google.maps.LatLng({ lat: 48.832380, lng: 2.234953 });
        this.isAdvancedMarkerOn = false;
        this.mapRendered = false;

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
            styles: light as google.maps.MapTypeStyle[],
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

        this.mapRendered = true;

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
                this.props.UpdateSpeed(Math.round(position.coords.speed * 3.6));
            this.setState({
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
        var size = this.calculateMapViewSize();
        var mapStyle = { width: size * 2, height: size * 2, transform: perspectiveTransform };

        if (this.mapRendered) {
            if (this.props.DarkThemeEnabled)
                this.applyDarkTheme();
            else
                this.applyLightTheme();
        }

        return (
            <Fragment>
                <div id="map" style={mapStyle}></div>
                <div className="map-items">
                    <button onClick={this.updatePosition1}>Position 1</button>
                    <button onClick={this.updatePosition2}>Position 2</button>
                </div>
            </Fragment>
        );
    }

    updatePosition2() {
        this.positionUpdated({ coords: { latitude: 48.832515, longitude: 2.235443, heading: 60, accuracy: 0.001, speed: 60, altitude: 0, altitudeAccuracy: 0.001 }, timestamp: Date.now() })
    }

    updatePosition1() {
        this.positionUpdated({ coords: { latitude: 48.832380, longitude: 2.234953, heading: 60, accuracy: 0.001, speed: 50, altitude: 0, altitudeAccuracy: 0.001 }, timestamp: Date.now() })
    }

    calculateMapViewSize() {
        var viewSize = Math.min(window.innerHeight, window.innerWidth)
        var mapSize = viewSize;
        return mapSize;
    }
}





