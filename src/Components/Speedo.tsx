import React, { Component } from 'react';

interface SpeedoProps {
    Speed: number
}

export class Speedo extends Component<SpeedoProps, {}> {
    render()
    {
        return (<h1 className="speed">{this.props.Speed ? this.props.Speed : '--'} km/h</h1>);
    }
}