// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.get('/:tipo/:pesquisa', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {

    let pesquisa = `%${req.params.pesquisa}%`;

    return banco.sql.query(`select 
                            * 
                            from Receita 
                            where nomeReceita like '${pesquisa}'`);
  }).then(consulta => {

    console.log(`Resultado da consulta: ${JSON.stringify(consulta.recordset)}`);

    if (consulta.recordset.length == 0) {
      res.status(404).send('Nenhuma receita encontrada');
    } else {
      res.send(consulta.recordset);
    }

  }).catch(err => {

    var erro = `Erro na pesquisa de receitas: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

router.get('/listar', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    return banco.sql.query(`select * from receita order by codreceita desc`);
  }).then(consulta => {

    console.log(`Resultado da consulta: ${JSON.stringify(consulta.recordset)}`);

    if (consulta.recordset.length == 0) {
      res.status(404).send('Nenhuma receita encontrada');
    } else {
      res.send(consulta.recordset);
    }

  }).catch(err => {

    var erro = `Erro na pesquisa de receitas: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });
});

router.post('/editarReceita', function (req, res, next) {

  banco.sql.close();

  var nome;
  var temperatura;
  var tempo;
  var tipo;
  var desc;
  var img;
  var codReceita;

  banco.conectar().then(() => {
    console.log(`Chegou p/ editar: ${JSON.stringify(req.body)}`);
    nome = req.body.nome; // depois de .body, use o nome (name) do campo em seu formulário
    temperatura = req.body.temperatura; // depois de .body, use o nome (name) do campo em seu formulário
    tempo = req.body.tempo; // depois de .body, use o nome (name) do campo em seu formulário
    tipo = req.body.tipo; // depois de .body, use o nome (name) do campo em seu formulário
    desc = req.body.desc; // depois de .body, use o nome (name) do campo em seu formulário
    img = img == undefined?req.body.img:'../documentation/img/oveniot.png'; // depois de .body, use o nome (name) do campo em seu formulário
    codReceita = req.body.codReceita; // depois de .body, use o nome (name) do campo em seu formulário
    if (nome == undefined || temperatura == undefined || tempo == undefined || tipo == undefined || desc == undefined || codReceita == undefined) {
    // coloque a frase de erro que quiser aqui. Ela vai aparecer no formulário de cadastro
      throw new Error(`Dados para editar não chegaram completos: ${nome} / ${temperatura} / ${tempo} / ${desc} / ${codReceita} / ${img} / ${tipo}`);
    }
    return;
  }).finally(() => {
    banco.sql.query(`
        update receita set nomeReceita='${nome}',
                           tempoReceita=${tempo},
                           tipoReceita='${tipo}',
                           descReceita='${desc}',
                           imagemReceita='${img}',
                           temperaturaReceita=${temperatura}
                           where codReceita='${codReceita}'`).then(function() {
      console.log(`edição realizada com sucesso!`);
      res.sendStatus(201); 
      // status 201 significa que algo foi criado no back-end, 
        // no caso, um registro de usuário ;)   
    }).catch(err => {

      var erro = `Erro no edição: ${err}`;
      console.error(erro);
      res.status(500).send(erro);

    }).finally(() => {
      banco.sql.close();
    });
  });
});

// não mexa nesta linha!
module.exports = router;