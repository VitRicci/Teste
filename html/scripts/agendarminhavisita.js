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
    sliderFade('.slider-left .slide-img');
    sliderFade('.slider-right .slide-img');

    document.getElementById('opcoes').addEventListener('change', function() {
        const outroContainer = document.getElementById('outroContainer');
        if (this.value === 'Outro') {
            outroContainer.innerHTML = '<textarea id="outroTexto" placeholder="Descreva a escolaridade e/ou tipo de visitantes" required rows="2" style="resize:vertical; font-size:0.95rem;"></textarea>';
        } else {
            outroContainer.innerHTML = '';
        }
    });

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

        // Salva no Local Storage
        const novoAgendamento = { nome, email, opcoes, outroTexto, numeroVisitantes, cidade, data, horario, aprovado: false };
        const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        agendamentos.push(novoAgendamento);
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

        // Mostra confirmação e dados da visita marcada
        const confirmacao = document.getElementById('confirmacao');
        const dados = document.getElementById('dadosAgendamento');
        confirmacao.style.display = 'block';
        dados.innerHTML = `
            <li><strong>Nome:</strong> ${nome}</li>
            <li><strong>E-mail:</strong> ${email}</li>
            <li><strong>Escolaridade:</strong> ${opcoes}${opcoes === 'Outro' && outroTexto ? ' (' + outroTexto + ')' : ''}</li>
            <li><strong>Número de visitantes:</strong> ${numeroVisitantes}</li>
            <li><strong>Cidade:</strong> ${cidade}</li>
            <li><strong>Data:</strong> ${data}</li>
            <li><strong>Horário:</strong> ${horario}</li>
        `;
        this.style.display = 'none';
    });
});