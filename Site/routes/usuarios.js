// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!
const crypto = require("crypto");
const DADOS_CRIPTOGRAFAR = {
  algoritmo : "aes256",
  codificacao : "utf8",
  segredo : "chaves",
  tipo : "hex"
};
const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);


router.post('/entrar', function (req, res, next) {

  banco.conectar().then(() => {
     console.log(`Chegou p/ login: ${JSON.stringify(req.body)}`);
    var login = req.body.login; // depois de .body, use o nome (name) do campo em seu formulário de login
    var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login
    if (login == undefined || senha == undefined) {
      throw new Error(`Dados de login não chegaram completos: ${login} / ${senha}`);
    }
    return banco.sql.query(`select * from usuario where emailUsuario='${login}' and senhaUsuario='${criptografar(senha)}'`);
  }).then(consulta => {

    console.log(`Usuários encontrados: ${JSON.stringify(consulta.recordset)}`);

    if (consulta.recordset.length==1) {
      res.send(consulta.recordset[0]);
    } else {
      res.sendStatus(404);
    }

  }).catch(err => {

    var erro = `Erro no login: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });
});

router.post('/cadastrar', function (req, res, next) {

  var nome;
  var email;
  var senha;
  var cadastro_valido = false;

  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);
	  nome = req.body.nome; // depois de .body, use o nome (name) do campo em seu formulário de login
    email = req.body.email; // depois de .body, use o nome (name) do campo em seu formulário de login
    senha = req.body.senha1; // depois de .body, use o nome (name) do campo em seu formulário de login
    if (nome == undefined || senha == undefined || email == undefined) {
	  // coloque a frase de erro que quiser aqui. Ela vai aparecer no formulário de cadastro
      throw new Error(`Dados de cadastro não chegaram completos: ${nome} / ${senha} / ${email}`);
    }
    return banco.sql.query(`select count(*) as contagem from usuario where emailUsuario = '${email}'`);
  }).then(consulta => {

	if (consulta.recordset[0].contagem >= 1) {
		res.status(400).send(`Já existe usuário com o login "${email}"`);
		return;
    } else {
		console.log('válido!');
		cadastro_valido = true;
	}

  }).catch(err => {

    var erro = `Erro no cadastro: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
	  if (cadastro_valido) {		  
			  
		banco.sql.query(`insert into usuario values ('${nome}','${email}','${criptografar(senha)}', 2)`).then(function() {
			console.log(`Cadastro criado com sucesso!`);
			res.sendStatus(201); 
			// status 201 significa que algo foi criado no back-end, 
				// no caso, um registro de usuário ;)		
		}).catch(err => {

			var erro = `Erro no cadastro: ${err}`;
			console.error(erro);
			res.status(500).send(erro);

		}).finally(() => {
			banco.sql.close();
		});
	  }
  });
});

router.post('/editar', function (req, res, next) {

  banco.sql.close();

  var novo_nome;
  var nova_senha;
  var codUsuario;
  var textoSQL;

  banco.conectar().then(() => {
    console.log(`Chegou p/ editar: ${JSON.stringify(req.body)}`);
    novo_nome = req.body.novo_nome; // depois de .body, use o nome (name) do campo em seu formulário
    nova_senha = req.body.nova_senha; // depois de .body, use o nome (name) do campo em seu formulário
    codUsuario = req.body.codUsuario; // depois de .body, use o nome (name) do campo em seu formulário

    textoSQL = `update usuario set nomeUsuario='${novo_nome}' where codUsuario='${codUsuario}'`

    if (nova_senha != undefined) {
      textoSQL = `update usuario set nomeUsuario='${novo_nome}', senhaUsuario='${nova_senha}' where codUsuario='${codUsuario}'`;
    }
    return;
  }).finally(() => {
    banco.sql.query(textoSQL).then(function() {
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

router.post('/cadastrarReceita', function (req, res, next) {

  banco.sql.close();

  var nome;
  var temperatura;
  var tempo;
  var tipo;
  var desc;
  var img;
  var cd_usuario;
  var cadastro_valido = false;

  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);
    nome = req.body.nome; // depois de .body, use o nome (name) do campo em seu formulário
    temperatura = req.body.temperatura; // depois de .body, use o nome (name) do campo em seu formulário
    tempo = req.body.tempo; // depois de .body, use o nome (name) do campo em seu formulário
    tipo = req.body.tipo; // depois de .body, use o nome (name) do campo em seu formulário
    desc = req.body.desc; // depois de .body, use o nome (name) do campo em seu formulário
    img = img == undefined?req.body.img:'../documentation/img/oveniot.png'; // depois de .body, use o nome (name) do campo em seu formulário
    cd_usuario = req.body.cd_usuario; // depois de .body, use o nome (name) do campo em seu formulário
    if (nome == undefined || temperatura == undefined || tempo == undefined || tipo == undefined || desc == undefined || cd_usuario == undefined) {
    // coloque a frase de erro que quiser aqui. Ela vai aparecer no formulário de cadastro
      throw new Error(`Dados de cadastro não chegaram completos: ${nome} / ${temperatura} / ${tempo} / ${tipo} / ${desc} / ${cd_usuario} / ${img}`);
    }
    return banco.sql.query(`select count(*) as contagem from receita where nomeReceita = '${nome}'`);
  }).then(consulta => {

  if (consulta.recordset[0].contagem >= 1) {
    res.status(400).send(`Já existe uma receita com esse nome: "${nome}"`);
    return;
    } else {
    console.log('válido!');
    cadastro_valido = true;
  }

  }).catch(err => {

    var erro = `Erro no select: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    if (cadastro_valido) {      
      // ;
      // insert into temperaturaumidade (temperatura, codReceita) values (${temperatura});
    banco.sql.query(`
        insert into receita values ('${nome}','${tempo}','${tipo}','${desc}',${cd_usuario},'${img}', ${temperatura})`).then(function() {
      console.log(`Cadastro criado com sucesso!`);
      res.sendStatus(201); 
      // status 201 significa que algo foi criado no back-end, 
        // no caso, um registro de usuário ;)   
    }).catch(err => {

      var erro = `Erro no cadastro: ${err}`;
      console.error(erro);
      res.status(500).send(erro);

    }).finally(() => {
      banco.sql.close();
    });
    }
  });
});

router.post('/cadastrarForno', function (req, res, next) {

  banco.sql.close();

  var sensor;
  var cd_usuario;
  var cadastro_valido = false;

  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);
    sensor = req.body.sensor; // depois de .body, use o nome (name) do campo em seu formulário
    cd_usuario = req.body.cd_usuario; // depois de .body, use o nome (name) do campo em seu formulário
    if (sensor == undefined) {
    // coloque a frase de erro que quiser aqui. Ela vai aparecer no formulário de cadastro
      throw new Error(`Dado de cadastro não chegou completo: ${sensor}`);
    }
    return banco.sql.query(`select count(*) as contagem from UsuarioSensor where codSensor = '${sensor}'`);
  }).then(consulta => {

  if (consulta.recordset[0].contagem >= 1) {
    res.status(400).send(`Já existe um sensor com esse codigo: "${nome}"`);
    return;
    } else {
    console.log('válido!');
    cadastro_valido = true;
  }

  }).catch(err => {

    var erro = `Erro no select: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    if (cadastro_valido) {      
        
    banco.sql.query(`insert into UsuarioSensor values (${sensor},${cd_usuario})`).then(function() {
      console.log(`Cadastro criado com sucesso!`);
      res.sendStatus(201); 
      // status 201 significa que algo foi criado no back-end, 
        // no caso, um registro de usuário ;)   
    }).catch(err => {

      var erro = `Erro no cadastro: ${err}`;
      console.error(erro);
      res.status(500).send(erro);

    }).finally(() => {
      banco.sql.close();
    });
    }
  });
});

function criptografar(senha) {
  const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
  cipher.update(senha);
  senha = cipher.final(DADOS_CRIPTOGRAFAR.tipo);
  return senha;
};

function descriptografar(senha) {
  const decipher = crypto.createDecipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
  decipher.update(senha, DADOS_CRIPTOGRAFAR.tipo);
  return decipher.final();
};

// não mexa nesta linha!
module.exports = router;