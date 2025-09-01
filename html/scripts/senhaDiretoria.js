function mostrarSenha() {
    document.getElementById('senhaDiretoria').style.display = 'block';
}

function verificarSenha() {
    const senha = document.getElementById('inputSenha').value;
    fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha })
    })
    .then(res => res.json())
    .then(data => {
        if (data.autorizado) {
            window.location.href = 'diretoria.html';
        } else {
            document.getElementById('erroSenha').textContent = 'Senha incorreta!';
        }
    })
    .catch(() => {
        document.getElementById('erroSenha').textContent = 'Erro ao conectar ao servidor!';
    });
}