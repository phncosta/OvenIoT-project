var usuario;

function verificarAutenticacao() {
    usuario = sessionStorage.nome;
    if (usuario == undefined) {
        window.location.href = 'crud.html';
    } else {
        // b_usuario.innerHTML = usuario;
    }
}

function logoff() {
    sessionStorage.clear();
    verificarAutenticacao();
}