function calculo() {
    /*Tempo do fogo ligado em minutos*/
    var tempoLig = tempo.value;

    /*Preco do botijão*/
    var pb = precoBotijao.value;

    /*Peso do botijão*/
    var b = botijao.value;

    // formula para calcular o gasto cozinhando com gás
    var calculoDinheiro = (((tempoLig / 60) * 0.225) / b) * pb;

    // formula pra calcular o gasto com panela eletrica
    var valorEletrico = calculoDinheiro / 10;

    //transformando minutos em segundos
    tempoLig = tempoLig * 60;

    //calculo para descobrir o tempo gasto cozinhando com panela eletrica
    tempoLig = tempoLig - (tempoLig / 3);

    // transformando minutos em segundos, retirando os minutos para sobrar as casas decimais que representam os segundos
    var s = (((tempoLig / 60) - parseInt(tempoLig / 60)));

    // transformando os segundos em minutos
    var m = tempoLig / 60;

    // armazenando os minutos em uma variavel
    var minuto = m;

    // transformando as casas depois da virgula em segundos
    var segundo = s * 100;

    // verificando se os segundos são maiores que 60 para acrescentar mais 1 minuto e pegar o resto que são os segundos de fato
    if (segundo >= 60) {
        segundo = segundo % 60;
    }

    //  armazenando o tempo numa variavel
    tempoLig = minuto.toFixed(0) + " minutos e " + segundo.toFixed(0) + " segundos.";

    divisor.classList.remove("d-none");
    frase.classList.remove("d-none");

    // envio de dados para uma div chamada 'mostrar' que mostra o dinheiro gasto
    mostrar1.innerHTML = `R$${calculoDinheiro.toFixed(2)}`;
    mostrar1_1.innerHTML = `R$${valorEletrico.toFixed(2)}`;

    // envio de dados para a segunda div que mostra o tempo gasto
    mostrar2.innerHTML = `${tempoLig}`;
}