import './Array';
import BoardMaster from './BoardMaster';

export default class GameMaster {

  constructor(options = {}) {
    this.mapSize = 4;
    this.iStopLoop = 2000;
    this.iLoopCount = 0;
    this.callback = options.callback || {};
    this.boardMaster = new BoardMaster([this.mapSize, this.mapSize]);
    document.addEventListener('keydown',(e)=> {
      console.log('===========');
      console.log(e.keyCode);
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
      console.log(map);
      if(map===false)
        return;
      this.boardMaster.overrideMap(map);
      this.addRandom([[1]]);
      console.log(this.boardMaster.getMap().stringify());
      if(this.isNoMoreMerge()) {
        console.log('game over');
        return;
      }
    });

    this.initializeGame();

    // return {
    //   on: (eventName, fn)=> { this.callback[eventName] = fn; }
    // };
  }

  initializeGame() {
    this.addRandom([[1]]);
    this.addRandom([[1]]);
    console.log(this.boardMaster.getMap().stringify());
  }

  dumpMap() {
    return this.boardMaster.getMap();
  }

  addRandom(map) {
    var positions = this.boardMaster.getMap().getPositions(position=>
      !this.boardMaster.isOverBeyondMap(map, position) && !this.boardMaster.isAlreadyExist(map, position)
    );
    this.boardMaster.add(map, positions[Math.floor( Math.random() * positions.length )]);
    this.callback.addRandom && this.callback.addRandom(this.boardMaster.getMap());
  }

  isNoMoreMerge() {
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

  isUnchangedTo(map) {
    return this.boardMaster.getMap().getPositions(position=>
      map[position.y][position.x]!==this.boardMaster.getMap()[position.y][position.x]
    ).length===0;
  }

  doWhenLeft() {
    var map = this.boardMaster.getMap().mapAll((v,i,a)=> this.mergeBy2048(v,i[1],a[i[0]]));
    return this.isUnchangedTo(map) ? false : map;
  }

  doWhenTop() {
    var map = this.boardMaster.getMap().turn().turn().turn().mapAll((v,i,a)=> this.mergeBy2048(v,i[1],a[i[0]])).turn();
    return this.isUnchangedTo(map) ? false : map;
  }

  doWhenRight() {
    var map = this.boardMaster.getMap().turn().turn().mapAll((v,i,a)=> this.mergeBy2048(v,i[1],a[i[0]])).turn().turn();
    return this.isUnchangedTo(map) ? false : map;
  }

  doWhenBottom() {
    var map = this.boardMaster.getMap().turn().mapAll((v,i,a)=> this.mergeBy2048(v,i[1],a[i[0]])).turn().turn().turn();
    return this.isUnchangedTo(map) ? false : map;
  }
}
