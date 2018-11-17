import './Array';
import BoardMaster from './BoardMaster';

export default class GameMaster {

  constructor(argument) {
    this.mapSize = 4;
    this.iStopLoop = 2000;
    this.iLoopCount = 0;
    this.boardMaster = new BoardMaster([this.mapSize, this.mapSize]);
    window.bm = this.boardMaster;
    document.addEventListener('keydown',(e)=> {
      console.log('===========');
      console.log(e.keyCode);
      var map = [];
      switch(e.keyCode){
        case 37:
          // debugger;
          map = this.doWhenLeft(true);
          break;
        case 38:
          // debugger;
          map = this.doWhenTop(true);
          break;
        case 39:
          // debugger;
          map = this.doWhenRight(true);
          break;
        case 40:
          // debugger;
          map = this.doWhenBottom(true);
          break;
        default:
          return;
      }
      console.log(map);
      if(map===false)
        return;
      // console.log('to');
      // console.log(map.stringify());
      this.boardMaster.overrideMap(map);
      this.add([[1]]);
      // console.log('add');
      console.log(this.boardMaster.getMap().stringify());
      if(this.isNoMore()) {
        console.log('game over');
        return;
      }
    });

    this.add([[1]]);
    this.add([[1]]);
    console.log(this.boardMaster._map.stringify());
  }

  add(map) {
    var positions = this.boardMaster.getPositionsOnly(position=>
      !this.boardMaster.isOverBeyondMap(map, position) && !this.boardMaster.isAlreadyExist(map, position)
    );
    this.boardMaster.add(map, positions[Math.floor( Math.random() * positions.length )]);
  }

  isNoMore() {
    // console.log('just check');
    return this.doWhenLeft() === false &&
    this.doWhenTop() === false &&
    this.doWhenRight() === false &&
    this.doWhenBottom() === false
  }

  mergeBy2048(_, i, a) {
    if(this.iLoopCount >= this.iStopLoop)
      return;

    for(var j=i+1; j<a.length; j++) {
      var v;
      if(a[i]===0 && a[j]!==0) {
        this.iLoopCount++;
        v=this.mergeBy2048(a[j], j, a);
        a[j]=0;
        return v;
      }
      if(a[i]>0 && a[i]===a[j]) {
        v=a[i]+a[j];
        a[j]=0;
        return v;
      }
      if(a[i]>0 && a[j]>0) {
        break;
      }
    }
    return a[i];
  }

  doWhenLeft(log) {
    var map = this.boardMaster.getMap().mapAll((v,i,a)=> this.mergeBy2048(v,i[1],a[i[0]]));
    // debugger;
    return this.boardMaster.getPositionsOnly(position=>
      map[position.y][position.x]!==this.boardMaster.getMap()[position.y][position.x]
    ).length===0 ? false : map;
  }

  doWhenTop(log) {
    var map = this.boardMaster.getMap().turn().turn().turn().mapAll((v,i,a)=> this.mergeBy2048(v,i[1],a[i[0]])).turn();
    // debugger;
    return this.boardMaster.getPositionsOnly(position=>
      map[position.y][position.x]!==this.boardMaster.getMap()[position.y][position.x]
    ).length===0 ? false : map;
  }

  doWhenRight(log) {
    var map = this.boardMaster.getMap().turn().turn().mapAll((v,i,a)=> this.mergeBy2048(v,i[1],a[i[0]])).turn().turn();
    // debugger;
    return this.boardMaster.getPositionsOnly(position=>
      map[position.y][position.x]!==this.boardMaster.getMap()[position.y][position.x]
    ).length===0 ? false : map;
  }

  doWhenBottom(log) {
    var map = this.boardMaster.getMap().turn().mapAll((v,i,a)=> this.mergeBy2048(v,i[1],a[i[0]])).turn().turn().turn();
    // debugger;
    return this.boardMaster.getPositionsOnly(position=>
      map[position.y][position.x]!==this.boardMaster.getMap()[position.y][position.x]
    ).length===0 ? false : map;
  }
}
