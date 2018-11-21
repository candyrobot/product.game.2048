import React, { Component } from 'react';
import GameBoard from './component/GameBoard';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

import GameMaster from './object/GameMaster';

class App extends Component {
  constructor(props) {
    super(props);
    this.gm = new GameMaster({
      callback: {
        addRandom: (map)=> {
          // xxxx.refresh();
          this.setState({ map: map });
        },
        mergeBy2048: (dat)=> {
          $(`table [key="${dat.y}"] [key="${dat.x}"] span`).css({
            x: dat.x
          }).transit({
            x: dat.toX
          });
        }
      }
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <GameBoard map={this.gm.dumpMap()} />
      </div>
    );
  }
}

export default App;
