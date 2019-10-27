import React from 'react';
import './App.css';
import { Map } from './Components/Map';
import { Speedo } from './Components/Speedo';

interface globalState {
  Speed: number,
  DarkTheme: boolean,
  HUD: boolean,
  setSpeed: (speed: number) => void
}

class App extends React.Component<{}, globalState> {
  constructor() {
    super({});
    this.state = { Speed: 0, DarkTheme: false, HUD: false, setSpeed: this.setSpeed }
  }

  setSpeed(speed: number) {
    this.setState({ Speed: speed });
  }

  render() {
    return (
      <div className="App grid">
        <div className="map">
          <Map />
        </div>
        <div className="speedo">
          <Speedo Speed={this.state.Speed} />
        </div>
        <div className="controls">
          <p><input type="checkbox" />Use Dark Theme</p>
          <p><input type="checkbox" />Enable HUD</p>
        </div>
      </div>
    );
  }
}

export default App;