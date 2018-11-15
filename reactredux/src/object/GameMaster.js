import './Array';
import BoardMaster from './BoardMaster';

export default class GameMaster {

  constructor(argument) {
    this.mapSize = 4;
    this.boardMaster = new BoardMaster([this.mapSize, this.mapSize]);
    this.add();
    this.add();
    console.log(this.boardMaster._map.stringify());
  }

  add() {
    var position = {
      x:Math.floor( Math.random() * this.mapSize ),
      y:Math.floor( Math.random() * this.mapSize )
    };
    if(this.boardMaster.isAlreadyExist([[1]], position)) {
      return console.warn('is already exist!');
      this.add();
    }
    this.boardMaster.add([[1]], position);
  }
}