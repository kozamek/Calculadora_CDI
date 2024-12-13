const args = process.argv;
console.log(args);

var moment = require('moment'); // npm install moment

// Verificar se os argumentos necessários foram fornecidos
if (args.length < 5) {
    console.error('Uso: node script.js <taxa_selic_anual> <data_fim> <valor_inicial>');
    process.exit(1);
}

// Pegar os argumentos e inicializar variáveis
var taxaSelicAnual = parseFloat(args[2]);
var dataFim = moment(args[3]);
var valorInicial = parseFloat(args[4]);

// Verificar se os argumentos são válidos
if (isNaN(taxaSelicAnual) || !dataFim.isValid() || isNaN(valorInicial)) {
    console.error('Argumentos inválidos');
    process.exit(1);
}

var dataAtual = moment();
var selicDiaria = (taxaSelicAnual / 100 / 365).toFixed(10);
var count = 0;

// Calcular a porcentagem de IR devido com base na quantidade de dias
function calcularIR(dias) {
    if (dias <= 180) return 0.22;
    if (dias <= 360) return 0.20;
    if (dias <= 720) return 0.175;
    return 0.15;
}

var porcentIR = calcularIR(dataFim.diff(dataAtual, 'days'));

console.log('Valor do rendimento inicial com R$' + valorInicial);

var valorFinal = valorInicial;
var dataIteracao = moment(dataAtual);

// Loop diário até a data final
while (dataIteracao.isBefore(dataFim)) {
    valorFinal += valorFinal * selicDiaria;
    count++;

    // Imprimir resultados a cada 30 dias e no primeiro dia
    if (count % 30 === 0 || count === 1) {
        var rendimentoDiario = (valorFinal * selicDiaria) - (porcentIR * (valorFinal * selicDiaria));
        console.log(`Rendimento no dia ${dataIteracao.format('YYYY-MM-DD')} no valor R$${rendimentoDiario.toFixed(2)}. Rendimento acumulado na data: R$${valorFinal.toFixed(2)}`);
    }

    dataIteracao.add(1, 'days');
}

var ganho = valorFinal - valorInicial;
var impostoDeRenda = porcentIR * ganho;
valorFinal -= impostoDeRenda;

console.log(`Investimento final sem imposto: R$${(valorFinal + impostoDeRenda).toFixed(2)}`);
console.log(`Imposto de Renda cobrado: R$${impostoDeRenda.toFixed(2)} sobre percentual do IR: ${porcentIR * 100}%. Lucro de investimento: R$${ganho.toFixed(2)}`);
console.log(`Data final: ${dataIteracao.format('YYYY-MM-DD')}`);
console.log(`Rendimento final total: R$${valorFinal.toFixed(2)}`);
console.log(`Quantidade de dias: ${count}`);