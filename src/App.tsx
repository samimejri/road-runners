import React from 'react';
import './App.css';
import { Map } from './Components/Map';
import { Speedo } from './Components/Speedo';

class App extends React.Component {
  render() {
    return (
      <div className="App grid">
        <div className="map">
          <Map />
        </div>
        <div className="speedo">
          <Speedo Speed={0} />
        </div>
        <div className="controls">
          <h5>controls</h5>
        </div>
      </div>
    );
  }
}

export default App;