import './Array';
import BoardMaster from './BoardMaster';

export default class GameMaster {

  constructor(argument) {
    this.mapSize = 4;
    this.iStopLoop = 2000;
    this.iLoopCount = 0;
    this.boardMaster = new BoardMaster([this.mapSize, this.mapSize]);
    this.add([[1]]);
    this.add([[1]]);

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

  add(map) {
    if(this.iLoopCount >= this.iStopLoop) {
      return;
    }
    if(this.boardMaster.getPutablePositions(map).length === 0) {
      console.log('game over');
      return;
    }
    var position = this.getRandamPosition();
    if(this.boardMaster.isAlreadyExist(map, position)) {
      console.warn('is already exist!');
      this.iLoopCount++;
      this.add(map);
      return;
    }
    this.boardMaster.add(map, position);
    console.log(this.boardMaster._map.stringify());
  }

  mergeBy2048(_, i, a) {
    if(this.iLoopCount >= this.iStopLoop) {
      return;
    }

    for(var j=i+1; j<a.length; j++) {
      if(a[i]===0 && a[j]!==0) {
        this.iLoopCount++;
        var v=this.mergeBy2048(a[j], j, a);
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
    var map = this.boardMaster.getMap().mapAll((v,i,a)=> this.mergeBy2048(v,i[1],a[i[0]]));
    this.boardMaster.overrideMap(map);
    this.add([[1]]);
  }

  doWhenPushKeyTop() {
    var map = this.boardMaster.getMap().transpose().mapAll((v,i,a)=> this.mergeBy2048(v,i[1],a[i[0]])).transpose();
    this.boardMaster.overrideMap(map);
    this.add([[1]]);
  }

  doWhenPushKeyRight() {
    var map = this.boardMaster.getMap().turn().turn().mapAll((v,i,a)=> this.mergeBy2048(v,i[1],a[i[0]])).turn().turn();
    this.boardMaster.overrideMap(map);
    this.add([[1]]);
  }

  doWhenPushKeyBottom() {
    var map = this.boardMaster.getMap().turn().mapAll((v,i,a)=> this.mergeBy2048(v,i[1],a[i[0]])).turn().turn().turn();
    this.boardMaster.overrideMap(map);
    this.add([[1]]);
  }

}
