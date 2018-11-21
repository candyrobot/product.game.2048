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
          map = this.mergeToLeft();
          break;
        case 38:
          map = this.mergeToTop();
          break;
        case 39:
          map = this.mergeToRight();
          break;
        case 40:
          map = this.mergeToBottom();
          break;
        default:
          return;
      }
      if(this.isUnchangedTo(map))
        return;
      this.boardMaster.overrideMap(map);
      this.addRandom();
      console.log(1, this.boardMaster.getMap().stringify());
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
    this.addRandom();
    this.addRandom();
    console.log(this.boardMaster.getMap().stringify());
  }

  dumpMap() {
    return this.boardMaster.getMap();
  }

  addRandom() {
    var mapToAdd = [[{
      value: 1,
      x: undefined,
      y: undefined,
    }]];
    var positions = this.boardMaster.getMap().getPositions(position=> {
      return !this.boardMaster.isOverBeyondMap(mapToAdd, position) &&
             !this.boardMaster.isAlreadyExist(mapToAdd, position);
    });
    if(positions.length === 0)
      return false;
    this.boardMaster.add(mapToAdd, positions[Math.floor( Math.random() * positions.length )]);
    this.callback.addRandom && this.callback.addRandom(this.boardMaster.getMap());
  }

  isNoMoreMerge() {
    return this.isUnchangedTo(this.mergeToLeft()) &&
    this.isUnchangedTo(this.mergeToTop()) &&
    this.isUnchangedTo(this.mergeToRight()) &&
    this.isUnchangedTo(this.mergeToBottom())
  }

  mergeBy2048(dat, i, a) {
    if(this.iLoopCount >= this.iStopLoop)
      return;
    for(var j=i+1; j<a.length; j++) {
      if(a[i].value===0 && a[j].value!==0) {
        this.iLoopCount++;
        a[i]=this.mergeBy2048(a[j],j,a);
        a[j].value=0;
        // this.callback.mergeBy2048 && this.callback.mergeBy2048({ from:{ x:j, y:p.y }, to:{ x:i, y:p.y } });
        return a[i];
      }
      if(a[i].value>0 && a[i].value===a[j].value) {
        a[i].value=a[i].value+a[j].value;
        a[j].value=0;
        // this.callback.mergeBy2048 && this.callback.mergeBy2048({ from:{ x:j, y:p.y }, to:{ x:i, y:p.y } });
        return a[i];
      }
      if(a[i].value>0 && a[j].value>0) {
        break;
      }
    }
    return a[i];
  }

  isUnchangedTo(map) {
    return this.boardMaster.getMap().getPositions(position=>
      map[position.y][position.x].value!==this.boardMaster.getMap()[position.y][position.x].value
    ).length===0;
  }

  mergeToLeft() {
    return this.boardMaster.getMap().mapAll((v,p,map)=> this.mergeBy2048(v,p.x,map[p.y]));
  }

  mergeToTop() {
    return this.boardMaster.getMap().turn().turn().turn().mapAll((v,p,map)=> this.mergeBy2048(v,p.x,map[p.y])).turn();
  }

  mergeToRight() {
    return this.boardMaster.getMap().turn().turn().mapAll((v,p,map)=> this.mergeBy2048(v,p.x,map[p.y])).turn().turn();
  }

  mergeToBottom() {
    return this.boardMaster.getMap().turn().mapAll((v,p,map)=> this.mergeBy2048(v,p.x,map[p.y])).turn().turn().turn();
  }
}
