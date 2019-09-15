// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.get('/ultimas', function (req, res, next) {
  banco.sql.close();
  console.log(banco.conexao);
  banco.conectar().then(() => {
    var limite_linhas = 5;
    return banco.sql.query(`select top ${limite_linhas} 
                            codEventos as Eventos, 
                            temperaturaSensor as temperatura, 
                            umidadeSensor as umidade, 
                            FORMAT(dataHora AT TIME ZONE 'UTC' AT TIME ZONE 'E. South America Standard TIME','HH:mm:ss') as 'Data_Hora' 
                            from Eventos order by codEventos desc`);
  }).then(consulta => {

    console.log(`Resultado da consulta: ${JSON.stringify(consulta.recordset)}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

router.get('/estatisticas', function (req, res, next) {
  console.log(banco.conexao);

  var estatisticas = {
    temp_maxima: 0,
    temp_minima: 0,
    temp_media: 0
  };

  banco.conectar().then(() => {
    return banco.sql.query(`
        select 
          max(temperaturaSensor) as temp_maxima, 
          min(temperaturaSensor) as temp_minima, 
          avg(temperaturaSensor) as temp_media 
        from eventos
        `);
  }).then(consulta => {
    estatisticas.temp_maxima = consulta.recordset[0].temp_maxima;
    estatisticas.temp_minima = consulta.recordset[0].temp_minima;
    estatisticas.temp_media = consulta.recordset[0].temp_media;
    console.log(`Estatísticas: ${estatisticas}`);
    res.send(estatisticas);
  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});


// não mexa nesta linha!
module.exports = router;
