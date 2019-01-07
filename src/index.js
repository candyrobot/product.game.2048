import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Buffer from './object/Buffer.js'

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

class Particle {
  constructor(value) {
    this.value = value;
  }
  val(value) {
    return value ? (this.value = value) : this.value;
  }
}


//


const gameBoard = new GameBoard([4,4], undefined);

// gameBoard.dump()[0][3] = 1
// するとすべての4番目が1になる。なぜ、、！

// gameBoard.find([3, 0]).value = new Particle(1);

console.log(gameBoard.dump())


// gameBoard.add(o);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
