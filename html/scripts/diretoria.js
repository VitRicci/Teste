async function buscarPresencas(visitaId) {
    try {
        const res = await fetch(`https://projetomuseu.vercel.app/api/presenca?visitaId=${visitaId}`);
        const data = await res.json();
        return data.presencas || [];
    } catch {
        return [];
    }
}

// Função para marcar presença no backend
async function marcarPresencaBackend(idx) {
    const nomeResp = prompt('Digite seu nome para confirmar:');
    const podeComparecer = confirm('Pode comparecer? OK para SIM, Cancelar para NÃO');
    const visitas = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const visita = visitas[idx];
    const presenca = {
        responsavel: nomeResp,
        status: podeComparecer ? 'Confirmado' : 'Não pode comparecer',
        visitaId: idx // Use um identificador único se possível
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
            carregarVisitasDiretoria();
        } else {
            alert('Erro ao registrar presença.');
        }
    } catch {
        alert('Erro de conexão com o backend.');
    }
}

// Função para remover presença no backend
async function removerPresencaBackend(visitaId, nomeResp) {
    try {
        const res = await fetch('https://projetomuseu.vercel.app/api/presenca', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ visitaId, responsavel: nomeResp })
        });
        const data = await res.json();
        if (data.removido) {
            alert('Presença removida!');
            carregarVisitasDiretoria();
        } else {
            alert('Erro ao remover presença.');
        }
    } catch {
        alert('Erro de conexão com o backend.');
    }
}

async function carregarVisitasDiretoria() {
    const lista = document.getElementById('listaVisitasDiretoria');
    lista.innerHTML = '';
    const visitas = JSON.parse(localStorage.getItem('agendamentos')) || [];
    for (let idx = 0; idx < visitas.length; idx++) {
        const visita = visitas[idx];
        const li = document.createElement('li');
        li.textContent = `${visita.nome} - ${visita.data} ${visita.horario}`;

        // Botão de marcar presença
        const btnPresenca = document.createElement('button');
        btnPresenca.textContent = 'Marcar presença';
        btnPresenca.className = 'btn-presenca';
        btnPresenca.onclick = () => marcarPresencaBackend(idx);
        li.appendChild(btnPresenca);

        // Buscar e exibir presenças
        const presencas = await buscarPresencas(idx);
        if (presencas.length > 0) {
            const ulPresenca = document.createElement('ul');
            ulPresenca.style.marginTop = '8px';
            presencas.forEach(p => {
                const liP = document.createElement('li');
                liP.textContent = `${p.responsavel} - ${p.status}`;
                ulPresenca.appendChild(liP);
            });
            li.appendChild(ulPresenca);
        }

        lista.appendChild(li);
    }
}

document.addEventListener('DOMContentLoaded', carregarVisitasDiretoria);