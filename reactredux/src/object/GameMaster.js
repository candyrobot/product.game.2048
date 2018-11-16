import './Array';
import BoardMaster from './BoardMaster';

export default class GameMaster {

  constructor(argument) {
    this.mapSize = 4;
    this.iStopLoop = 2000;
    this.iLoopCount = 0;
    this.boardMaster = new BoardMaster([this.mapSize, this.mapSize]);
    document.addEventListener('keydown',(e)=> {
      switch(e.keyCode){
        case 37:
          this.doWhenLeft();
          break;
        case 38:
          this.doWhenTop();
          break;
        case 39:
          this.doWhenRight();
          break;
        case 40:
          this.doWhenBottom();
          break;
      }
    });

    this.add([[1]]);
    this.add([[1]]);
  }

  add(map) {
    if(this.iLoopCount >= this.iStopLoop)
      return;

    var positions = this.boardMaster.getPositionsOnly(position=>
      !this.boardMaster.isOverBeyondMap(map, position) && !this.boardMaster.isAlreadyExist(map, position)
    );
    this.boardMaster.add(map, positions[Math.floor( Math.random() * positions.length )]);
    console.log(this.boardMaster._map.stringify());
    if(this.isNoMore()) {
      console.log('game over');
      return;
    }
  }

  isNoMore() {
    this.iLoopCount++;
    return this.doWhenLeft() === false &&
    this.doWhenTop() === false &&
    this.doWhenRight() === false &&
    this.doWhenBottom() === false
  }

  mergeBy2048(_, i, a) {
    if(this.iLoopCount >= this.iStopLoop)
      return;

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

  doWhenLeft() {
    var map = this.boardMaster.getMap().mapAll((v,i,a)=> this.mergeBy2048(v,i[1],a[i[0]]));
    if(false)
      return false;
    this.boardMaster.overrideMap(map);
    this.add([[1]]);
  }

  doWhenTop() {
    var map = this.boardMaster.getMap().transpose().mapAll((v,i,a)=> this.mergeBy2048(v,i[1],a[i[0]])).transpose();
    if(false)
      return false;
    this.boardMaster.overrideMap(map);
    this.add([[1]]);
  }

  doWhenRight() {
    var map = this.boardMaster.getMap().turn().turn().mapAll((v,i,a)=> this.mergeBy2048(v,i[1],a[i[0]])).turn().turn();
    if(false)
      return false;
    this.boardMaster.overrideMap(map);
    this.add([[1]]);
  }

  doWhenBottom() {
    var map = this.boardMaster.getMap().turn().mapAll((v,i,a)=> this.mergeBy2048(v,i[1],a[i[0]])).turn().turn().turn();
    if(false)
      return false;
    this.boardMaster.overrideMap(map);
    this.add([[1]]);
  }
}
