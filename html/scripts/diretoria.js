function carregarVisitasDiretoria() {
    const lista = document.getElementById('listaVisitasDiretoria');
    lista.innerHTML = '';
    const visitas = JSON.parse(localStorage.getItem('agendamentos')) || [];
    visitas.forEach((visita, idx) => {
        const li = document.createElement('li');
        li.textContent = `${visita.nome} - ${visita.data} ${visita.horario}`;
        const btnPresenca = document.createElement('button');
        btnPresenca.textContent = 'Marcar presença';
        btnPresenca.onclick = () => marcarPresenca(idx);
        li.appendChild(btnPresenca);
        lista.appendChild(li);
    });
}

function marcarPresenca(idx) {
    const nomeResp = prompt('Digite seu nome para confirmar:');
    const podeComparecer = confirm('Pode comparecer? OK para SIM, Cancelar para NÃO');
    const visitas = JSON.parse(localStorage.getItem('agendamentos')) || [];
    visitas[idx].presenca = {
        responsavel: nomeResp,
        status: podeComparecer ? 'Confirmado' : 'Não pode comparecer'
    };
    localStorage.setItem('agendamentos', JSON.stringify(visitas));
    carregarVisitasDiretoria();
}

document.addEventListener('DOMContentLoaded', carregarVisitasDiretoria);