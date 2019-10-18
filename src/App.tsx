import React from 'react';
import './App.css';
import { Map } from './Components/Map';

class App extends React.Component {
  render() {
    return (
      <div className="App grid-container">
        <div className="menu">
          <h5>Menu</h5>
        </div>
        <div className="header">
          <h4>Road Runners</h4>
        </div>
        <div className="content">
          <Map />
        </div>
        <div className="footer">
          <h5>footer</h5>
        </div>
      </div>
    );
  }
}

export default App;