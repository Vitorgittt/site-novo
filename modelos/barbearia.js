document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceSelect = document.getElementById('service-select');
    const dateInput = document.getElementById('booking-date');
    const bookingForm = document.getElementById('booking-form');

    // Define a data mínima como hoje para impedir agendamentos no passado
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;

    // Permite clicar no cartão de serviço para já selecionar no formulário
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            serviceCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            const chosenService = card.getAttribute('data-service');
            serviceSelect.value = chosenService;

            // Rola suavemente até o formulário
            document.getElementById('agendar').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Envia os dados do agendamento para o WhatsApp
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('client-name').value.trim();
        const service = serviceSelect.value;
        const barber = document.getElementById('barber-select').value;
        const rawDate = dateInput.value; // Formato YYYY-MM-DD
        const time = document.getElementById('booking-time').value;

        // Converte data para DD/MM/AAAA
        const [year, month, day] = rawDate.split('-');
        const formattedDate = `${day}/${month}/${year}`;

        const message = 
            `Olá! Gostaria de agendar um horário na *Navalha Club*:\n\n` +
            `*Cliente:* ${name}\n` +
            `*Serviço:* ${service}\n` +
            `*Barbeiro:* ${barber}\n` +
            `*Data:* ${formattedDate}\n` +
            `*Horário:* ${time}\n\n` +
            `Aguardo confirmação!`;

        const phone = "5561991459292";
        const url = `https://whatsapp.com{phone}&text=${encodeURIComponent(message)}`;

        window.open(url, '_blank');
    });
});
