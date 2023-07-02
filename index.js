var moment = require('moment');//npm install moment
var a = moment('2023-04-24'); var m;
var b = moment('2027-12-30');
var arr = [50000, 80000]; var funds_inicial = 0;
var selic_diaria = 0.0003739726; //Selic = 13.75%, que para CDI 13,65/100= 0,1365, e 0,1365/365 = 0,0003739726
var count = 0;
var porcent_ir = IR_devido_por_dias(b.diff(a,'days'));//chamada da fuction passado quantidade dias do investimento para verificar o IR devido
arr.forEach(funds =>{ console.log('Valor do redimento inicial com R$'+ funds);
funds_inicial = funds;
m = moment(a);
for (m ; m.isBefore(b); m.add(1, 'days')) {
    funds = funds + (funds*selic_diaria);
    count = count + 1;
    if((count%30==0)||(count==1))//if para imprimir em 30 dias e primeiro dia
    {
      console.log('Redimento no dia '+m.format('YYYY-MM-DD') +' no valor R$'+((funds*selic_diaria)-(porcent_ir*(funds*selic_diaria))));
    }
}
var ganho = funds-funds_inicial;
var ir = porcent_ir*ganho;
funds = funds-ir;
console.log("Investimento final sem imposto R$"+(funds+ir));
console.log("Imposto de Renda cobrado R$"+ir," sobre percentual do ir "+porcent_ir,"sobre lucro de investimento R$"+ganho);
console.log("Data final "+m.format('YYYY-MM-DD')); console.log("Redimento final total R$"+funds);
console.log("Quantidade de dias "+count);
});


function IR_devido_por_dias(dias) {
  var porcent_ir;
switch (true) {
  case (dias <= 180):
  porcent_ir = 0.22;
  break
  case (dias>=181)&(dias<=360):
  porcent_ir = 0.20;
  break
  case (dias>=361)&(dias<=720):
  porcent_ir = 0.175;
  break
  case (dias>720):
  porcent_ir = 0.15;
  break
}
return porcent_ir;
}
