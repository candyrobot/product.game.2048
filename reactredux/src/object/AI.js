export default class AI {
  constructor(gm) {
    this.gm = gm;

    var timer = setInterval(()=> {
      var method = this.getMethodBest();
      method === undefined ? clearInterval(timer) : this.gm.play(method);
    }, 100);
  }

  getMethodBest() {
    var result = undefined;
    var methods = ['left','top','right','bottom'];
    var scores = [];

    if(this.gm.isUnchangedTo(this.gm.mergeToLeft()))
      scores[0] = -1000000;
    else
      scores[0] = this.getMergableScore(this.gm.mergeToLeft({ isReturnMapJustMerged: true })) -
                  this.getDangerScore(this.gm.mergeToLeft({ isReturnMapJustMerged: true }));

    if(this.gm.isUnchangedTo(this.gm.mergeToTop()))
      scores[1] = -1000000;
    else
      scores[1] = this.getMergableScore(this.gm.mergeToTop({ isReturnMapJustMerged: true })) -
                  this.getDangerScore(this.gm.mergeToTop({ isReturnMapJustMerged: true }));

    if(this.gm.isUnchangedTo(this.gm.mergeToRight()))
      scores[2] = -1000000;
    else
      scores[2] = this.getMergableScore(this.gm.mergeToRight({ isReturnMapJustMerged: true })) -
                  this.getDangerScore(this.gm.mergeToRight({ isReturnMapJustMerged: true }));

    if(this.gm.isUnchangedTo(this.gm.mergeToBottom()))
      scores[3] = -1000000;
    else
      scores[3] = this.getMergableScore(this.gm.mergeToBottom({ isReturnMapJustMerged: true })) -
                  this.getDangerScore(this.gm.mergeToBottom({ isReturnMapJustMerged: true }));

    console.log(scores);

    var keyHavingMax;
    for(let i in scores) {
      scores[i] === Math.max(...scores) && (keyHavingMax = i)
    }

    console.log('key', keyHavingMax);

    return methods[keyHavingMax];
  }

  getDangerScore(map) {
    var score = 0;
    // INFO: horizontal check.
    map.forEach((a, y)=> {
      a.forEach((v, x)=> {
        if(a[x+1]===undefined)
          return;
        score = score + (a[x].value < a[x+1].value ? 1 : 0);
      });
    });
    // INFO: vertical check.
    // map[0].forEach((v, x)=> {
    //   map.forEach((a, y)=> {
    //     if(map[y+1]===undefined)
    //       return;
    //     score = score + (map[y][x] < map[y+1][x] ? 1 : 0);
    //   });
    // }, 0);
    return score;
  }

  getMergableScore(map) {
    var score = 0;
    map.forEach((a, y)=> {
      a.forEach((v, x)=> {
        if(a[x+1]===undefined)
          return;
        score = score + (a[x].value === a[x+1].value ? 1 : 0);
      });
    });
    return score;
  }
}

// - reduce
// - reduceRight

// INFO: 以下はどちらも score: 2だが、前者のほうがdangerではない

// getDangerScore([
//   2,3
//   2,3
// ])

// getDangerScore([
//   2,3
//   3,3
// ])
