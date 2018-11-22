import './Array';
import BoardMaster from './BoardMaster';

export default class GameMaster {

  constructor(options = {}) {
    this.mapSize = 4;
    this.iStopLoop = 2000;
    this.iLoopCount = 0;
    this.callback = options.callback || {};
    this.boardMaster = new BoardMaster([this.mapSize, this.mapSize]);
    this.count = 0;

    document.addEventListener('keydown',(e)=> {
      e.keyCode===37&&this.play('left');
      e.keyCode===38&&this.play('top');
      e.keyCode===39&&this.play('right');
      e.keyCode===40&&this.play('bottom');
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

  play(method) {
    console.log('===========');
    console.log(method);
    var map = [];

    if(method==='left')
      map = this.mergeToLeft({ doWhenMerged: this.callback.mergeBy2048 });
    else if(method==='top')
      map = this.mergeToTop({ doWhenMerged: this.callback.mergeBy2048 });
    else if(method==='right')
      map = this.mergeToRight({ doWhenMerged: this.callback.mergeBy2048 });
    else if(method==='bottom')
      map = this.mergeToBottom({ doWhenMerged: this.callback.mergeBy2048 });
    else
      return;

    if(this.isUnchangedTo(map))
      return;

    this.boardMaster.overrideMap(map);
    this.addRandom();

    console.log(this.boardMaster.getMap().stringify());

    if(this.isNoMoreMerge()) {
      console.log('game over');
      return;
    }

    this.count++;
    console.log(this.count);
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
    var positions = this.boardMaster.getMap().getPositions((_, position)=> {
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

  mergeBy2048(dat, i, a, option = {}) {
    for(var j=i+1; j<a.length; j++) {
      if(a[i].value===0 && a[j].value!==0) {
        a[i].value=a[j].value;
        a[j].value=0;
        option.doWhenMerged && option.doWhenMerged({ x:a[j].x, y:a[j].y, toX:a[i].x, toY:a[i].y });
        a[i].value=this.mergeBy2048(a[i],i,a,option).value;
        return a[i];
      }
      if(a[i].value>0 && a[i].value===a[j].value) {
        a[i].value=a[i].value+a[j].value;
        a[j].value=0;
        option.doWhenMerged && option.doWhenMerged({ x:a[j].x, y:a[j].y, toX:a[i].x, toY:a[i].y });
        return a[i];
      }
      if(a[i].value>0 && a[j].value>0) {
        break;
      }
    }
    return a[i];
  }

  isUnchangedTo(map) {
    return this.boardMaster.getMap().getPositions((_, position)=>
      map[position.y][position.x].value!==this.boardMaster.getMap()[position.y][position.x].value
    ).length===0;
  }

  mergeToLeft(option = {}) {
    var map = this.boardMaster.getMap().mapAll((v,p,map)=> this.mergeBy2048(v,p.x,map[p.y],option));
    return option.isReturnMapJustMerged ? map : map;
  }

  mergeToTop(option = {}) {
    var map = this.boardMaster.getMap().turn().turn().turn().mapAll((v,p,map)=> this.mergeBy2048(v,p.x,map[p.y],option));
    return option.isReturnMapJustMerged ? map : map.turn();
  }

  mergeToRight(option = {}) {
    var map = this.boardMaster.getMap().turn().turn().mapAll((v,p,map)=> this.mergeBy2048(v,p.x,map[p.y],option));
    return option.isReturnMapJustMerged ? map : map.turn().turn();
  }

  mergeToBottom(option = {}) {
    var map = this.boardMaster.getMap().turn().mapAll((v,p,map)=> this.mergeBy2048(v,p.x,map[p.y],option));
    return option.isReturnMapJustMerged ? map : map.turn().turn().turn();
  }
}
