import React from 'react';
import './App.css';
import { Map } from './Components/Map';
import { Speedo } from './Components/Speedo';

interface globalState {
  Speed: number,
  DarkTheme: boolean,
  HUD: boolean
}

class App extends React.Component<{}, globalState> {
  constructor() {
    super({});
    this.state = { Speed: 0, DarkTheme: false, HUD: false }
    this.setSpeed = this.setSpeed.bind(this);
    this.changeMapTheme = this.changeMapTheme.bind(this);
    this.enableHUD = this.enableHUD.bind(this);
  }

  setSpeed(speed: number) {
    this.setState({ Speed: speed });
  }

  changeMapTheme(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ DarkTheme: e.target.checked });
  }

  enableHUD(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ HUD: e.target.checked });
  }

  render() {
    var style = { transform: '' }
    if (this.state.HUD) {
      style.transform = 'scaleY(-1)';
    }

    return (
      <div className="App grid">
        <div className="map" style={style}>
          <Map UpdateSpeed={this.setSpeed} DarkThemeEnabled={this.state.DarkTheme} HUDEnabled={this.state.HUD} />
          <div className="vignette"></div>
        </div>
        <div className="speedo" style={style}>
          <Speedo Speed={this.state.Speed} DarkThemeEnabled={this.state.DarkTheme} HUDEnabled={this.state.HUD} />
        </div>
        <div className="controls">
          <div>
            <p><input type="checkbox" onChange={this.changeMapTheme} />Use Dark Theme</p>
            <p><input type="checkbox" onChange={this.enableHUD} />Enable HUD</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;