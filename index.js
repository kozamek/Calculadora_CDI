var moment = require('moment');//npm install moment
var a = moment('2023-04-10');
var b = moment('2025-12-30');
var arr = [1000,10000,100000,1000000];
var selic_diaria = 0.000382; //Selic diaria 13.75% ano
var count = 0;
arr.forEach(funds =>{ console.log('Valor do redimento inicial com R$'+ funds);
for (var m = moment(a); m.isBefore(b); m.add(1, 'days')) {
    funds = funds + (funds*selic_diaria);
    var valor = funds*selic_diaria;
    count = count + 1;
    if((count%30==0)||(count==1))//if para imprimir em 30 dias e primeiro dia
    {
      console.log('Redimento no dia '+m.format('YYYY-MM-DD') +' no valor R$'+ valor);
    }
}
console.log("Data final "+m.format('YYYY-MM-DD')); console.log("Redimento final total R$"+funds);
console.log("Quantidade de dias "+count);
});