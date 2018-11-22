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
    var score = {
      left: undefined,
      top: undefined,
      right: undefined,
      bottom: undefined,
    };

    if(!this.gm.isUnchangedTo(this.gm.mergeToLeft()))
      score.left =
      this.getMergableScore(this.gm.mergeToLeft({ isReturnMapJustMerged: true })) -
      this.getDangerScore(this.gm.mergeToLeft({ isReturnMapJustMerged: true }));

    if(!this.gm.isUnchangedTo(this.gm.mergeToTop()))
      score.top =
      this.getMergableScore(this.gm.mergeToTop({ isReturnMapJustMerged: true })) -
      this.getDangerScore(this.gm.mergeToTop({ isReturnMapJustMerged: true }));

    if(!this.gm.isUnchangedTo(this.gm.mergeToRight()))
      score.right =
      this.getMergableScore(this.gm.mergeToRight({ isReturnMapJustMerged: true })) -
      this.getDangerScore(this.gm.mergeToRight({ isReturnMapJustMerged: true }));

    if(!this.gm.isUnchangedTo(this.gm.mergeToBottom()))
      score.bottom =
      this.getMergableScore(this.gm.mergeToBottom({ isReturnMapJustMerged: true })) -
      this.getDangerScore(this.gm.mergeToBottom({ isReturnMapJustMerged: true }));

    console.log(score);

    // INFO: remove propaty from Object which has undefined value.
    Object.keys(score).forEach((key) => (score[key] == null) && delete score[key]);

    var keyHavingMax;
    for(let key in score) {
      score[key] === Math.max(...Object.values(score)) && (keyHavingMax = key)
    }

    console.log('key', keyHavingMax);

    return keyHavingMax;
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
