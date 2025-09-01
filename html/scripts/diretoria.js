async function marcarPresencaBackend(idx) {
    const nomeResp = prompt('Digite seu nome para confirmar:');
    const podeComparecer = confirm('Pode comparecer? OK para SIM, Cancelar para NÃO');
    const visitas = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const presenca = {
        responsavel: nomeResp,
        status: podeComparecer ? 'Confirmado' : 'Não pode comparecer',
        visita: visitas[idx]
    };

    try {
        const res = await fetch('https://projetomuseu.vercel.app/api/presenca', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(presenca)
        });
        const data = await res.json();
        if (data.recebido) {
            alert('Presença registrada no backend!');
        } else {
            alert('Erro ao registrar presença.');
        }
    } catch {
        alert('Erro de conexão com o backend.');
    }
}

function carregarVisitasDiretoria() {
    const lista = document.getElementById('listaVisitasDiretoria');
    lista.innerHTML = '';
    const visitas = JSON.parse(localStorage.getItem('agendamentos')) || [];
    visitas.forEach((visita, idx) => {
        const li = document.createElement('li');
        li.textContent = `${visita.nome} - ${visita.data} ${visita.horario}`;
        const btnPresenca = document.createElement('button');
        btnPresenca.textContent = 'Marcar presença';
        btnPresenca.onclick = () => marcarPresencaBackend(idx);
        li.appendChild(btnPresenca);
        lista.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', carregarVisitasDiretoria);