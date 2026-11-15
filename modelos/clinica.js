document.addEventListener('DOMContentLoaded', () => {
    const treatmentCards = document.querySelectorAll('.treatment-card');
    const treatmentSelect = document.getElementById('treatment-select');
    const clinicForm = document.getElementById('clinic-form');

    // Seleciona o tratamento ao clicar no cartão
    treatmentCards.forEach(card => {
        card.addEventListener('click', () => {
            treatmentCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            const chosen = card.getAttribute('data-treatment');
            treatmentSelect.value = chosen;

            document.getElementById('avaliacao').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Envia solicitação de avaliação para o WhatsApp
    clinicForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('patient-name').value.trim();
        const treatment = treatmentSelect.value;
        const period = document.getElementById('period-select').value;

        const message =
            `Olá! Gostaria de agendar uma avaliação na *Essence Odonto & Estética*:\n\n` +
            `*Paciente:* ${name}\n` +
            `*Tratamento:* ${treatment}\n` +
            `*Período de preferência:* ${period}\n\n` +
            `Quais horários vocês têm disponíveis?`;

        const phone = "5561991459292";
        const url = `https://whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

        window.open(url, '_blank');
    });
});
