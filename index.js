var moment = require('moment');//npm install moment
var a = moment('2023-04-10');
var b = moment('2027-12-30');
var arr = [1000,10000,100000,1000000];// lista de valores de valores a serem simulados, vc pode colocar apenas um valor unico entre chaves.
var selic_diaria = 0.0003739726; //Selic = 13.75%, que para CDI 13,65/100= 0,1365, e 0,1365/365 = 0,0003739726
var count = 0;
arr.forEach(funds =>{ console.log('Valor do redimento inicial com R$'+ funds);
for (var m = moment(a); m.isBefore(b); m.add(1, 'days')) {
    funds = funds + (funds*selic_diaria);
    count = count + 1;
    if((count%30==0)||(count==1))//if para imprimir em 30 dias e primeiro dia
    {
      console.log('Redimento no dia '+m.format('YYYY-MM-DD') +' no valor R$'+ (funds*selic_diaria));
    }
}
console.log("Data final "+m.format('YYYY-MM-DD')); console.log("Redimento final total R$"+funds);
console.log("Quantidade de dias "+count);
});
