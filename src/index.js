import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Space from './object/Space'
// TODO: ↓
import {
  Array
} from 'candyrobot.javascript.package.lib';

// - lv: ゲーム中の番号になる（value,numberは予約語）
// - area: 2次元, space: 3次元
// ## 絵文字
// - http://punchdrunker.github.io/iOSEmoji/table_html/ios6/
// - https://lets-emoji.com/ios11-emoji/

const gameBoard = new Space([4,4], null);

window.gameBoard = gameBoard;

// [1,0,1,1]
closest(0) // null
closest(1) // null
closest(2) // 0
closest(3) // 2


Array.prototype.do2048 = function(opt) {
  return this.map((v, i)=> {
    if (i === 0 || !v)
      return v;

    if (closest(i) !== null && this[closest(i)] === v) {
      move();
      grow();
    }

    // if (this[i-1])

  });
};

new class Game {
  constructor() {
    document.addEventListener('keydown', (e)=> {
      e.keyCode===37&&this.play('left');
      // e.keyCode===38&&this.play('top');
      // e.keyCode===39&&this.play('right');
      // e.keyCode===40&&this.play('bottom');

      console.log(gameBoard.dump().stringify());
    });

    this.addRandomly();
    this.addRandomly();
  }

  play() {
    gameBoard.dump() = gameBoard.dump().map((a, y)=> {
      return a.do2048({
        // dat.index
        // dat.value
        move: (dat, destinationDat)=> {},
        grow: (dat)=> {

        }
      });
    });
  }

  addRandomly() {
    const a = gameBoard.filter((dat)=> dat.value === null);
    const i = Math.randRange(0,a.length-1);
    // INFO: 要素の見つけ方と代入
    gameBoard.dump()[a[i].y][a[i].x] = 1;
  }
}






// [2,1,0,1]






























ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
