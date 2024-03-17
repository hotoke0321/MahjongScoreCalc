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
  
  if(PNum == 3){
    if(P1Ten == P2Ten){
      if(P1Ten == P3Ten){
        result = '0,0,0';
      }
    }
    //return PNum;
  }else{
    return '1,1,1';
  }

  return '8,8,8';
}
