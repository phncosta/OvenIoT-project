// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.get('/:receita', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    return banco.sql.query(`delete from Receita 
                            where codreceita = ${req.params.receita}`);
  }).finally(() => {
    banco.sql.close();
  });

});

// não mexa nesta linha!
module.exports = router;