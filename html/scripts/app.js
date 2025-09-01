function carregarAgendamentos() {
    const lista = document.getElementById('listaAgendamentos');
    lista.innerHTML = '';
    const removerSelect = document.getElementById('removerVisita');
    removerSelect.innerHTML = '<option value="" disabled selected>--Selecione uma visita--</option>';
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    agendamentos.forEach((item, idx) => {
        let escolaridade = item.opcoes;
        if (item.opcoes === 'Outro' && item.outroTexto) {
            escolaridade += ` (${item.outroTexto})`;
        }
        const li = document.createElement('li');
        if (item.aprovado === false) {
            li.innerHTML = `
                <div>
                    <span style="color:#e67e22;">[Pendente]</span> 
                    ${item.nome} (${item.email}) - ${escolaridade} - ${item.numeroVisitantes} visitantes - ${item.cidade} - ${item.data} às ${item.horario}
                </div>
                <div style="margin-top:8px;">
                    <button class="aprovarBtn" data-idx="${idx}" style="background:#27ae60;color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;margin-right:8px;">Aprovar</button>
                    <button class="recusarBtn" data-idx="${idx}" style="background:#e74c3c;color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;">Recusar</button>
                </div>
            `;
        } else {
            li.textContent = `${item.nome} (${item.email}) - ${escolaridade} - ${item.numeroVisitantes} visitantes - ${item.cidade} - ${item.data} às ${item.horario}`;
        }
        lista.appendChild(li);

        const option = document.createElement('option');
        option.value = idx;
        option.textContent = li.textContent;
        removerSelect.appendChild(option);
    });

    // Evento Aprovar
    document.querySelectorAll('.aprovarBtn').forEach(btn => {
        btn.onclick = function() {
            const idx = this.getAttribute('data-idx');
            const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
            agendamentos[idx].aprovado = true;
            localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
            carregarAgendamentos();
        };
    });

    // Evento Recusar
    document.querySelectorAll('.recusarBtn').forEach(btn => {
        btn.onclick = function() {
            const idx = this.getAttribute('data-idx');
            const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
            agendamentos.splice(idx, 1);
            localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
            carregarAgendamentos();
        };
    });
}

function sliderFade(selector, interval = 4000) {
    const slides = document.querySelectorAll(selector);
    let idx = 0;
    setInterval(() => {
        slides[idx].classList.remove('active');
        idx = (idx + 1) % slides.length;
        slides[idx].classList.add('active');
    }, interval);
}

document.addEventListener('DOMContentLoaded', function() {
    carregarAgendamentos();
    sliderFade('.slider-left .slide-img');
    sliderFade('.slider-right .slide-img');

    document.getElementById('agendamentoForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const opcoes = document.getElementById('opcoes').value;
        let outroTexto = '';
        if (opcoes === 'Outro') {
            outroTexto = document.getElementById('outroTexto').value;
        }
        const numeroVisitantes = document.getElementById('numeroVisitantes').value;
        const cidade = document.getElementById('cidade').value;
        const data = document.getElementById('data').value;
        const horario = document.getElementById('horario').value;
        

        const novoAgendamento = { nome, email, opcoes, outroTexto, numeroVisitantes, cidade, data, horario };
        const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        agendamentos.push(novoAgendamento);
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

        carregarAgendamentos();
        this.reset();
        document.getElementById('outroContainer').innerHTML = '';
    });

    document.getElementById('opcoes').addEventListener('change', function() {
        const outroContainer = document.getElementById('outroContainer');
        if (this.value === 'Outro') {
            outroContainer.innerHTML = '<textarea id="outroTexto" placeholder="Descreva a escolaridade e/ou tipo de visitantes" required rows="2" style="resize:vertical; font-size:0.95rem;"></textarea>';
        } else {
            outroContainer.innerHTML = '';
        }
    });

    document.getElementById('limparAgendamentos').addEventListener('click', function() {
        const senha = prompt("Digite a senha de administrador para limpar as visitas:");
        if (senha === "MuseuAnat202502") { // Troque "suaSenhaAqui" pela senha que você quiser
            localStorage.removeItem('agendamentos');
            carregarAgendamentos();
            alert("Visitas limpas com sucesso!");
        } else {
            alert("Senha incorreta. Apenas o administrador pode limpar as visitas.");
        }
    });

    document.getElementById('removerAgendamento').addEventListener('click', function() {
        const senha = prompt("Digite a senha de administrador para remover a visita:");
        if (senha === "MuseuAnat202502") { // Senha do administrador
            const removerSelect = document.getElementById('removerVisita');
            const idx = removerSelect.value;
            if (idx !== "") {
                const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
                agendamentos.splice(idx, 1);
                localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
                carregarAgendamentos();
                alert("Visita removida com sucesso!");
            }
        } else {
            alert("Senha incorreta. Apenas o administrador pode remover visitas.");
        }
    });
});

async function validarSenhaBackend(senha) {
    try {
        const res = await fetch('https://projetomuseu.vercel.app/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ senha })
        });
        const data = await res.json();
        return data.autorizado === true;
    } catch {
        alert('Erro ao conectar ao servidor de autenticação.');
        return false;
    }
}