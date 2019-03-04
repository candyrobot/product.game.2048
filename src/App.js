import React, { Component } from 'react';
import GameBoard from './component/GameBoard';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import 'jquery.transit';
import GameMaster from './object/GameMaster';
import AI from './object/AI';
import Flicker from './object/Flicker';

// - フリックで操作（斜めもできるような
// - ログインシステム
// - 保存と再開
// - 拡散
// - やり方説明（pakuru!)
// ここまで
// - アイテムの管理
// - 戻す
// - 壊す
// - 1,2を消す
// - 成長
// - ショップ
// - ログインボーナス

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

    Flicker.onFlick((distances)=> {
      if (Math.abs(distances.y) < 50 && distances.x < 0) {
        this.gm.play('left');
      }
      else if (Math.abs(distances.y) < 50 && distances.x >= 0) {
        this.gm.play('right');
      }
      else if (Math.abs(distances.x) < 50 && distances.y < 0) {
        this.gm.play('top');
      }
      else if (Math.abs(distances.x) < 50 && distances.y >= 0) {
        this.gm.play('bottom');
      }
      else {
        alert('フリックした？');
      }
    });

    // new AI(this.gm);
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
