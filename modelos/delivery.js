document.addEventListener('DOMContentLoaded', () => {
    let cart = [];

    const addButtons = document.querySelectorAll('.btn-add');
    const countEl = document.getElementById('cart-count');
    const totalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const clearBtn = document.getElementById('clear-btn');

    // Adiciona item ao clicar nos botões "+ Adicionar"
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));

            cart.push({ name, price });
            updateCart();

            // Feedback visual rápido no botão
            const originalText = button.innerText;
            button.innerText = '✓ Adicionado';
            button.style.backgroundColor = '#22c55e';
            
            setTimeout(() => {
                button.innerText = originalText;
                button.style.backgroundColor = '';
            }, 600);
        });
    });

    // Atualiza contadores e estado dos botões
    function updateCart() {
        const total = cart.reduce((sum, item) => sum + item.price, 0);

        countEl.innerText = cart.length;
        totalEl.innerText = total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        const isEmpty = cart.length === 0;
        checkoutBtn.disabled = isEmpty;
        clearBtn.disabled = isEmpty;
    }

    // Limpa o carrinho
    clearBtn.addEventListener('click', () => {
        cart = [];
        updateCart();
    });

    // Envia o pedido formatado para o WhatsApp
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;

        let message = "Olá! Gostaria de fazer um pedido pelo Cardápio Digital:\n\n";
        
        cart.forEach((item, index) => {
            const formattedPrice = item.price.toFixed(2).replace('.', ',');
            message += `${index + 1}. ${item.name} - R$ ${formattedPrice}\n`;
        });

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        const formattedTotal = total.toFixed(2).replace('.', ',');
        message += `\n*Total: R$ ${formattedTotal}*`;

        const phone = "5561991459292";
        const url = `https://whatsapp.com{phone}&text=${encodeURIComponent(message)}`;
        
        window.open(url, '_blank');
    });
});
