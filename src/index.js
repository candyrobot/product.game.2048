import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'candyrobot.javascript.package.lib';
import Buffer from './object/Buffer.js'

// - lv: ゲーム中の番号になる（value,numberは予約語）
// - area: 2次元, space: 3次元
// ## 絵文字
// - http://punchdrunker.github.io/iOSEmoji/table_html/ios6/
// - https://lets-emoji.com/ios11-emoji/

class GameBoard extends Buffer {
  constructor(a, b) {
    super(a, b);
  }

  /**
   * @param  {Array}
   */
  find(position) {
    return this.o[position[1]][position[0]];
  }
}

// class Particle {
//   constructor(value) {
//     this.value = value;
//   }
//   val(value) {
//     return value ? (this.value = value) : this.value;
//   }
// }

const gameBoard = new GameBoard([4,4], undefined);

window.gameBoard = gameBoard;

class Game {
  constructor() {
    // INFO: 要素の見つけ方と代入
    gameBoard.dump()[Math.randRange(0,3)][Math.randRange(0,3)] = 1;
    gameBoard.dump()[Math.randRange(0,3)][Math.randRange(0,3)] = 1;

    console.log(gameBoard.dump().stringify())
  }
}

new Game();






// [2,1,0,1].do2048({
//   // dat.index
//   // dat.value
//   move: (dat, destinationDat)=> {},
//   grow: (dat)=> {

//   }
// });






























ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
