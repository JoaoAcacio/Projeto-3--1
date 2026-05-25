// 1. Lógica de Alternância das Abas (Sem Recarregar)
const tabs = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.tab-panel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove classe ativa de todos os botões e painéis
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        // Adiciona classe ativa na aba clicada e no respectivo painel
        tab.classList.add('active');
        const targetPanel = document.getElementById(tab.dataset.tab);
        targetPanel.classList.add('active');
    });
});

// 2. Configuração dos Prazos Finais (Padrão ISO: AAAA-MM-DDTHH:MM:SS)
const deadlines = {
    'javascript': new Date('2026-06-15T00:00:00').getTime(),
    'python': new Date('2026-07-15T00:00:00').getTime(),
    'c': new Date('2026-10-20T00:00:00').getTime(),
    'cpp': new Date('2026-12-31T00:00:00').getTime()
};

// 3. Função para Atualizar os Cronômetros
function updateCountdowns() {
    const now = new Date().getTime();

    // Loop por cada linguagem definida nos prazos
    for (const lang in deadlines) {
        const target = deadlines[lang];
        const difference = target - now;

        // Seletores dos elementos HTML específicos de cada aba
        const container = document.getElementById(`timer-${lang}`);
        if (!container) continue;

        const daysEl = container.querySelector('.days');
        const hoursEl = container.querySelector('.hours');
        const minutesEl = container.querySelector('.minutes');
        const secondsEl = container.querySelector('.seconds');

        if (difference > 0) {
            // Cálculos matemáticos de conversão de tempo
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            // Insere os valores formatados com zero à esquerda se menor que 10
            daysEl.textContent = days < 10 ? '0' + days : days;
            hoursEl.textContent = hours < 10 ? '0' + hours : hours;
            minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
            secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
        } else {
            // Caso o tempo termine
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
        }
    }
}

// Executa a função imediatamente ao carregar e define o intervalo para cada 1 segundo
updateCountdowns();
setInterval(updateCountdowns, 1000);