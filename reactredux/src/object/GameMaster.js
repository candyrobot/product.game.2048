import './Array';
import BoardMaster from './BoardMaster';

export default class GameMaster {

  constructor(argument) {
    this.mapSize = 4;
    this.iStopLoop = 2000;
    this.iLoopCount = 0;
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
    if(this.iLoopCount >= this.iStopLoop) {
      return;
    }
    if(this.boardMaster.getPutablePositions([[1]]).length === 0) {
      console.log('game over');
      return;
    }
    var position = this.getRandamPosition();
    if(this.boardMaster.isAlreadyExist([[1]], position)) {
      console.warn('is already exist!');
      this.iLoopCount++;
      this.add();
    }
    this.boardMaster.add([[1]], position);
    console.log(this.boardMaster._map.stringify());
  }

  mergeBy2048(v, i, a) {
    console.log(a);
    for(var j=i+1; j<a.length; j++) {
      if(a[i]===0 && a[j]!==0) {
        var v=a[j];
        a[j]=0;
        return v;
      }
      if(a[i]>0 && a[i]===a[j]) {
        var v=a[i]+a[j];
        a[j]=0;
        return v;
      }
    }
    return a[i];
  }

  doWhenPushKeyLeft() {
    var map = this.boardMaster.getMap().mapAll(this.mergeBy2048);
    this.boardMaster.overrideMap(map);
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
