import './Array';
import BoardMaster from './BoardMaster';

export default class GameMaster {

  constructor(argument) {
    this.mapSize = 4;
    this.iStopLoop = 2000;
    this.iLoopCount = 0;
    this.boardMaster = new BoardMaster([this.mapSize, this.mapSize]);
    document.addEventListener('keydown',(e)=> {
      console.log('push');
      console.log(this.boardMaster._map.stringify());
      var map = [];
      switch(e.keyCode){
        case 37:
          map = this.doWhenLeft();
          break;
        case 38:
          map = this.doWhenTop();
          break;
        case 39:
          map = this.doWhenRight();
          break;
        case 40:
          map = this.doWhenBottom();
          break;
        default:
          return;
      }
      if(map===false)
        return;
      console.log('to');
      console.log(map.stringify());
      this.boardMaster.overrideMap(map);
      this.add([[1]]);
      console.log('add');
      console.log(this.boardMaster.getMap().stringify());
      if(this.isNoMore()) {
        console.log('game over');
        return;
      }
    });

    this.add([[1]]);
    this.add([[1]]);
  }

  add(map) {
    var positions = this.boardMaster.getPositionsOnly(position=>
      !this.boardMaster.isOverBeyondMap(map, position) && !this.boardMaster.isAlreadyExist(map, position)
    );
    this.boardMaster.add(map, positions[Math.floor( Math.random() * positions.length )]);
  }

  isNoMore() {
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
    return this.boardMaster.getPositionsOnly(position=>
      map[position.y][position.x]!==this.boardMaster.getMap()[position.y][position.x]
    ).length===0 ? false : map;
  }

  doWhenTop() {
    var map = this.boardMaster.getMap().transpose().mapAll((v,i,a)=> this.mergeBy2048(v,i[1],a[i[0]])).transpose();
    return this.boardMaster.getPositionsOnly(position=>
      map[position.y][position.x]!==this.boardMaster.getMap()[position.y][position.x]
    ).length===0 ? false : map;
  }

  doWhenRight() {
    var map = this.boardMaster.getMap().turn().turn().mapAll((v,i,a)=> this.mergeBy2048(v,i[1],a[i[0]])).turn().turn();
    return this.boardMaster.getPositionsOnly(position=>
      map[position.y][position.x]!==this.boardMaster.getMap()[position.y][position.x]
    ).length===0 ? false : map;
  }

  doWhenBottom() {
    var map = this.boardMaster.getMap().turn().mapAll((v,i,a)=> this.mergeBy2048(v,i[1],a[i[0]])).turn().turn().turn();
    return this.boardMaster.getPositionsOnly(position=>
      map[position.y][position.x]!==this.boardMaster.getMap()[position.y][position.x]
    ).length===0 ? false : map;
  }
}
