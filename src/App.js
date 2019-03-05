import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import GameBoard from './component/GameBoard';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import 'jquery.transit';
import SwipeCatcher from './component/SwipeCatcher'
import GameMaster from './object/GameMaster';
import AI from './object/AI';

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
    // new AI(this.gm);
  }

  onSwiping(e, deltaX, deltaY, absX, absY, velocity) {
    if(deltaX > 0){
      if(deltaY > 0){
        alert('左上');
      }else{
        alert('左下');
      }
    }else{
      if(deltaY > 0){
        alert('右上');
      }else{
        alert('右下');
      }
    }
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
        <Swipeable onSwiping={this.onSwiping}>
          <GameBoard map={this.gm.dumpMap()} />
        </Swipeable>
      </div>
    );
  }
}

export default App;
