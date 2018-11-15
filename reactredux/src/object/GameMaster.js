import './Array';
import BoardMaster from './BoardMaster';

export default class GameMaster {

  constructor(argument) {
    this.mapSize = 4;
    this.boardMaster = new BoardMaster([this.mapSize, this.mapSize]);
    this.add();
    this.add();

    document.addEventListener('keydown',(e)=> {
      switch(e.keyCode){
        case 37:
          this.doWhenPushKeyLeft();
          break;
        case 38:
          this.doWhenPushKeyTop();
          break;
        case 39:
          this.doWhenPushKeyRight();
          break;
        case 40:
          this.doWhenPushKeyBottom();
          break;
      }
    });
  }

  getRandamPosition() {
    return {
      x:Math.floor( Math.random() * this.mapSize ),
      y:Math.floor( Math.random() * this.mapSize )
    };
  }

  add() {
    var position = this.getRandamPosition();
    if(this.boardMaster.isAlreadyExist([[1]], position)) {
      console.warn('is already exist!');
      this.add();
      return;
    }
    this.boardMaster.add([[1]], position);
    console.log(this.boardMaster._map.stringify());
  }

  doWhenPushKeyLeft() {
    this.boardMaster.mergeLeft();
    this.add();
  }

  doWhenPushKeyTop() {
    this.add();
  }

  doWhenPushKeyRight() {
    this.add();
  }

  doWhenPushKeyBottom() {
    this.add();
  }

}
