function cadastrar() {

    var email = campo_cad_email;
    var nome = campo_cad_nome;
    var senha = campo_cad_senha;
    var conf_senha = campo_cad_conf_senha;

    filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    var ok = '';

    // validação do e-mail
    if (email.value == '') {
        email.classList.add("border-danger");
        alert_email.innerHTML = '*Você precisa colocar um e-mail.';
    }else if (!filter.test(document.getElementById("campo_cad_email").value)) {
        // a função .classList.add adiciona a classe que estiver no parametro na tag
        email.classList.add("border-danger");
        alert_email.innerHTML = '*Por favor, digite o e-mail corretamente!';
    }else{
        // a função .classList.remove remove a classe que estiver no parametro na tag
        email.classList.remove("border-danger");
        alert_email.innerHTML = '';
        ok += 'email, ';
    }

    // validação do nome
    if (nome.value == '') {
        nome.classList.add("border-danger");
        alert_nome.innerHTML = '*Você precisa colocar seu nome!';
    }else if (nome.value.length <= 2) {
        nome.classList.add("border-danger");
        alert_nome.innerHTML = '*Seu nome deve ter mais que duas letras.';
    }else{
        nome.classList.remove("border-danger");
        alert_nome.innerHTML = '';
        ok += 'nome, ';
    }

    // validação da senha
    if (senha.value == '') {
        senha.classList.add("border-danger");
        alert_senha.innerHTML = '*Você precisa colocar uma senha!';
    }else if (senha.value.length < 8) {
        senha.classList.add("border-danger");
        alert_senha.innerHTML = '*A senha deve conter no minimo 8 caracteres.';
    }else{
        senha.classList.remove("border-danger");
        alert_senha.innerHTML = '';
        ok += 'senha, ';
    }

    // validação da confirmação de senha
    if (conf_senha.value == '') {
        conf_senha.classList.add("border-danger");
        alert_conf_senha.innerHTML = '*Você precisa colocar uma senha!';
    }else if (senha.value != conf_senha.value) {
        conf_senha.classList.add("border-danger");
        alert_conf_senha.innerHTML = '*As senhas não coincidem!';
    }else{
        conf_senha.classList.remove("border-danger");
        alert_conf_senha.innerHTML = '';
        ok += 'confirmação de senha';
    }

    // confirmando as validações
    if (ok == 'email, nome, senha, confirmação de senha') {
        alert('Cadastrado com sucesso!');

        sessionStorage.setItem('email', email.value);
        sessionStorage.setItem('nome', nome.value);
        sessionStorage.setItem('senha', senha.value);

        usuario = {
            email: sessionStorage.getItem('email'),
            nome: sessionStorage.getItem('nome'),
            senha: sessionStorage.getItem('senha')
        }

        // login.push(campo_cad_email.value);
        // login.push(campo_cad_senha.value);
        exibir(tela_login, tela_esqueci_senha, tela_cadastro);

        // essa função atualiza a pagina
        // window.location.reload();
    }
}

function esqueciSenha(){

    var email = campo_ps_email;
    var senha = campo_ps_senha;

    filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    var ok = '';

    alert_success.innerHTML = '';

    // validação do email
    if (email.value == '') {
        email.classList.add("border-danger");
        alert_ps_email.innerHTML = '*Você precisa colocar seu email.';
    }else if (!filter.test(document.getElementById("campo_ps_email").value)) {
        email.classList.add("border-danger");
        alert_ps_email.innerHTML = '*Por favor, digite o email corretamente!';
    }else{
        email.classList.remove("border-danger");
        alert_ps_email.innerHTML = '';
        ok += 'email, ';
    }

    // validação da nova senha
    if (senha.value == '') {
        senha.classList.add("border-danger");
        alert_ps_senha.innerHTML = '*Você precisa colocar uma nova senha!';
    }else if (senha.value.length < 8) {
        senha.classList.add("border-danger");
        alert_ps_senha.innerHTML = '*A senha deve conter no minimo 8 caracteres!';
    }else{
        senha.classList.remove("border-danger");
        alert_ps_senha.innerHTML = '';
        ok += 'senha';
    }

    // confirmação da validações
    if (ok == 'email, senha') {
        alert_success.innerHTML = 'Um e-mail de confirmação foi enviado para você.'
    }
}

function validarEmail(email)
{
    usuario = email.value.substring(0, email.value.indexOf("@"));
    dominio = email.value.substring(email.value.indexOf("@")+ 1, email.value.length);
 
    if ((usuario.length >=1) 
    &&(dominio.length >=3) 
    &&(usuario.search("@")==-1) 
    &&(dominio.search("@")==-1) 
    &&(usuario.search(" ")==-1) 
    &&(dominio.search(" ")==-1) 
    &&(dominio.search(".")!=-1) 
    &&(dominio.indexOf(".") >=1)
    &&(dominio.lastIndexOf(".") < dominio.length - 1))
    {
        email.classList.add("is-valid");
        email.classList.remove("is-invalid");
    }
    else
    {
        email.classList.add("is-invalid");
    }
    
}

function validarNome(nome)
{
    if(nome.value.length >= 3)
    {
        nome.classList.add("is-valid");
        nome.classList.remove("is-invalid");
    }
    else
    {
        nome.classList.add("is-invalid");
    }
}

var forca = 0;

function validarSenha(senha)
{
    forca = 0;
    forcaSenha = senha.value.substring(0, senha.value.length);

    if(senha.value.length >=8)
    {
        forca += 1;
        senha.classList.remove("is-invalid");
        senha.classList.add("is-valid");
        if(forcaSenha.match(/[A-Z]+/))
        {
            forca += 1;
        }
        if(forcaSenha.match(/d+/))
        {
            forca += 2;
        }
        if(forcaSenha.match(/W+/))
        {
            forca += 3;
        }
    }
    else
    {
        senha.classList.add("is-invalid");
    }

  
    if(forca == 1)
    {
        alert_senha.innerHTML = `Senha fraca`;
        alert_senha.style.display = "block";
    }
    if(forca == 2)
    {
        alert_senha.innerHTML = `Senha mediana`;
    }
    if(forca == 3)
    {
        alert_senha.innerHTML = `Senha razoável`;
    }
    if(forca == 4)
    {
        alert_senha.innerHTML = `Senha boa`;
        alert_senha.classList.remove("text-danger");
        alert_senha.classList.add("text-warning");
    }
    if(forca == 5)
    {
        alert_senha.innerHTML = `Senha forte`;
    }
    if(forca == 6)
    {
        alert_senha.innerHTML = `Senha exelente`;
    }
}

function validarConfSenha(confSenha)
{
    if(confSenha.value == campo_cad_senha.value)
    {
        confSenha.classList.add("is-valid");
        confSenha.classList.remove("is-invalid");
    }
    else
    {
        confSenha.classList.add("is-invalid");
    }
}