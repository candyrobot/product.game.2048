import React, { Component } from 'react';
import Helmet from 'react-helmet';
import GameBoard from './component/GameBoard';
import ButtonAppBar from './component/ButtonAppBar.js';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import 'jquery.transit';

import GameMaster from './object/GameMaster';
import AI from './object/AI';

class App extends Component {
  constructor(props) {
    super(props);
    this.gm = new GameMaster({
      callback: {
        doWhenMoved: (dat)=> {
          var w = $('table td').outerWidth(true);
          var $el = $(`table [data-y="${dat.y}"] [data-x="${dat.x}"] div`)
            .stop(1,1)
            .transition({
              x: ( dat.toX - dat.x ) * w, y: ( dat.toY - dat.y ) * w
            }, 300, 'easeOutBack', ()=> {
              $el.css({ x: 0, y: 0 });
              this.setState({ map: this.gm.dumpMap() });
            });
        }
      }
    });
    {/*new AI(this.gm);*/}
  }
  render() {
    return (
      <div className="App">
        <Helmet>
          <style>{'body { background-color: black; }'}</style>
        </Helmet>
        <ButtonAppBar/>
        <GameBoard map={this.gm.dumpMap()} />
      </div>
    );
  }
}

export default App;
