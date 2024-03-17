window.function = function (PlayerNumber,DefTenbo,ReturnTenbo,RankPoint1,RankPoint2,RankPoint3,RankPoint4,Player1_Tenbo,Player2_Tenbo,Player3_Tenbo,Player4_Tenbo) {
  PNum = PlayerNumber.value ?? 0;
  DTen = DefTenbo.value ?? 0;
  RTen = ReturnTenbo.value ?? 0;
  RP1 = RankPoint1.value ?? 0;
  RP2 = RankPoint2.value ?? 0;
  RP3 = RankPoint3.value ?? 0;
  RP4 = RankPoint4.value ?? 0;
  P1Ten = Player1_Tenbo.value ?? 0;
  P2Ten = Player2_Tenbo.value ?? 0;
  P3Ten = Player3_Tenbo.value ?? 0;
  P4Ten = Player4_Tenbo.value ?? 0;
  
  var result = '';
  
  //点数の配列化
  var PTen = [P1Ten,P2Ten,P3Ten]
  if(PNum == 4){
    PTen.push(P4Ten);
  }
  
  //スコアの配列化
  var Score = [];
  PTen.forEach((Ten, idx) => {
    // 素点から返し点を減算
    Score.push(Math.floor((Ten - RTen)/1000));
  });
  
  // 順位の配列化
  var playerRank = rank(PTen);
  
  //1位の配列化
  var winner = [];
  playerRank.forEach((rnk, idx) => {
    //1位のindexを配列に格納
    if(rnk == 1){
      winner.push(idx);
    }
  });

  //最下位の配列化
  var mostloser = [];
  var worst = Math.max.apply(null, playerRank);
  playerRank.forEach((rnk, idx) => {
    //最下位のindexを配列に格納
    if(rnk == worst){
      mostloser.push(idx);
    }
  });
  
  //スコア計算
  CalcScore(score,rank,win,mostloser)

  return result = String.Join(",",score);

//順位を決定する
function rank(ten) {
  //並び替え（降順）
  const sorted = ten.slice().sort((a,b) => b - a); 
  // 元配列と並び替えた配列を比較
  const ranked = ten.slice().map((item) => {
    return sorted.indexOf(item) + 1
  })
  return ranked;
}

//スコア計算
function CalcScore(score,rank,win,mostloser) {
  var loserScore = 0;
  var winScore = 0;
  var worstScore = 0;
  //1位以外のスコアを合計し、1位のスコアを決定する
  score.forEach((Ten, idx) => {
    win.forEach((winP, win_idx) => {
      if(idx != winP){
        loserScore += Ten;
      }
    }
  });
  
  winScore = (0 - loserScore) / win.length;
  //1位のスコアが小数の場合、再計算
  if (!Number.isInteger(winScore)) {
    //1位のスコア切上
    winScore = Math.ceil(winScore);
    //再計算
    worstScore = 0 - (winScore * win.length);
    //最下位のスコアを更新（ここに辿り着く敗者はただ一人）
    score[mostloser[0]] = worstScore;
  }
  
  win.forEach((winP, win_idx) => {
      score[winP] = winScore;
  }
              
}
