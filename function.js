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

  //点数の配列化
  var PTen = [P1Ten,P2Ten,P3Ten];
  if(PNum == 4){
    PTen.push(P4Ten);
  }
  
  //スコアの配列化
  var Score = [];
  PTen.forEach((Ten, idx) => {
    // 素点から返し点を減算
    Score.push(Math.floor((Ten - RTen)/1000));
  });

  //順位点の配列化
  var RP = [RP1,RP2,RP3];
  if(PNum == 4){
    RP.push(RP4);
  }
  
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
  
  //素点計算
  CalcScore(Score,playerRank,winner,mostloser);

  //順位点加算
  CalcRP(Score,RP,playerRank);

  //小数点のスコアがある場合丸め処理を行う
  RoundScore(Score,playerRank,winner,mostloser);

  //スコアを文字列としてReturn
  var result = "";
  Score.forEach((value, idx) => {
    if(idx != 0){
      result += ","
    }
    result += String(value)
  });
  return result;
}

/////////////////////////////function///////////////////////////////

//順位を決定する
function rank(ten) {
  //並び替え（降順）
  const sorted = ten.slice().sort((a,b) => b - a); 
  // 元配列と並び替えた配列を比較
  const ranked = ten.slice().map((item) => {
    return sorted.indexOf(item) + 1;
  })
  return ranked;
}

//スコア計算
function CalcScore(Score,rank,win,mostloser) {
  var loserScore = 0;
  var winScore = 0;  
  //1位以外のスコアを合計し、1位のスコアを決定する
  Score.forEach((Ten, idx) => {
    if(!win.includes(idx)){
      loserScore += Ten;
    }
  });
  winScore = (0 - loserScore) / win.length;
  win.forEach((winP, win_idx) => {
      Score[winP] = winScore;
  });       
}

//順位点を加算しスコアを決定する
function CalcRP(Score,RP,playerRank){
  var startidx = 0;
  //1位から順に加算点を計算
  for (var x = 1; x <= Score.length; x++) {
    //同順位がいる場合、順位点を平均する
    var samerank = playerRank.filter((item) => playerRank == x);
    if(samerank.length != 0){
      var rpsum = 0;
      for (var i = startidx; i < startidx + samerank.length; i++) {
        rpsum += RP[i];
      }
      var rpt = rpsum / samerank.length;
      RP[x-1] = rpt;
    }
    startidx += samerank.length;
  }
  //Scoreに加算
  playerRank.forEach((value, idx) => {
      Score[idx] += RP[value-1];
  });
}

function RoundScore(Score,playerRank,winner,mostloser){
  //小数点スコアがある場合、1位の場合切上、1位以外の場合切下
  Score.forEach((value, idx) => {
    if (!Number.isInteger(value)) {
      if (playerRank[idx] == 1) {
        Score[idx] = Math.ceil(value);
      }
      else {
        Score[idx] = Math.floor(value);
      }
    }
  });
  
  //スコアの合計が0になるように調整
  const sum = Score.reduce((sum, num) => sum + num, 0);
  if(sum > 0){
    //最下位のスコアで調整
    mostloser.forEach((value, idx) => {
      Score[value] -= sum / mostloser.length;
    });
    
  }else if(sum < 0){
    //1位のスコアで調整
    winner.forEach((value, idx) => {
      Score[value] -= sum / winner.length;
    });
  }
}
