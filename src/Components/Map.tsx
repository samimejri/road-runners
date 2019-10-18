import React, { Component } from 'react';
import { mapStyle } from '../Ressources/MapStyle';
import { UserIndicator } from '../Ressources/icons';

interface mapState {
    speed: number | null,
    heading: number
}

export class Map extends Component<{}, mapState> {
    currentPosition!: google.maps.LatLng;
    previousPosition!: google.maps.LatLng;

    map!: google.maps.Map;
    userMarker!: google.maps.Marker;
    shadowMarker!: google.maps.Marker;

    constructor() {
        super({});
        this.state = { speed: 0, heading: 0 };
        this.currentPosition = new google.maps.LatLng({ lat: 48.832380, lng: 2.234953 });
    }

    componentDidMount() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: this.currentPosition,
            mapTypeId: 'roadmap',
            zoom: 18,
            disableDefaultUI: true,
            styles: mapStyle as google.maps.MapTypeStyle[]
        });

        this.userMarker = new google.maps.Marker({
            position: this.currentPosition,
            icon: UserIndicator,
            optimized: false,
            map: this.map
        });


        var overlay = new google.maps.OverlayView();
        overlay.draw = function () {
            this.getPanes().markerLayer.id = 'markerLayer';
        };

        overlay.setMap(this.map);

        var markerLayer = document.getElementById("markerLayer")
        if (markerLayer) {
            var canvas = markerLayer.getElementsByTagName("canvas")[0];
            var context = canvas.getContext("2d");
            if (context) {
                context.shadowBlur = 2;
                context.shadowColor = "yellow";
            }
        }

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
    }

    positionUpdated(position: Position) {
        if (position.coords.speed) {
            this.userMarker.setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
            this.map.panTo({ lat: position.coords.latitude, lng: position.coords.longitude });

            var heading = Math.round(window.google.maps.geometry.spherical.computeHeading(
                this.previousPosition,
                new google.maps.LatLng(position.coords.latitude, position.coords.longitude)));

            var orientedIcon = UserIndicator;
            orientedIcon.rotation = heading;
            this.userMarker.setIcon(orientedIcon);

            this.rotateMap(heading);

            this.setState({
                speed: Math.round(position.coords.speed),
                heading: heading
            });
        }

        this.previousPosition = new google.maps.LatLng({ lat: position.coords.latitude, lng: position.coords.longitude });
    }

    rotateMap(degs: number) {
        var div = document.getElementById('map');
        if (div != null) {
            div.style.webkitTransform = 'rotateZ(' + -degs + 'deg) rotateX(45deg)';
            div.style.transform = 'rotateZ(' + -degs + 'deg) rotateX(45deg)';
        }
    }

    render() {
        var maxSize = window.innerHeight >= window.innerWidth ? window.innerHeight : window.innerWidth;
        var mapStyle = { width: maxSize * 1.5, height: maxSize * 1.5, transform: 'rotateX(45deg)' };

        return (
            <div>
                <div className="map-container">
                    <div id="map" style={mapStyle}></div>
                    <h1 className="map-item">{this.state.speed ? this.state.speed * 3.6 : '--'} km/h</h1>
                </div>
                <h1>{this.state.heading ? this.state.heading * 3.6 : '--'} °</h1>
            </div>
        );
    }
}





