import React, { Component } from 'react';

interface SpeedoProps {
    Speed: number,
    DarkThemeEnabled: boolean,
    HUDEnabled: boolean
}

export class Speedo extends Component<SpeedoProps, {}> {
    render() {
        //var style = this.props.HUDEnabled ? {transform:'scaleY(-1)'} : {};
        return (
            <h1 className="speed">{this.props.Speed ? this.props.Speed : '--'} km/h</h1>
        );
    }
}