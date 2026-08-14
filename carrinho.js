// site que usei
// https://medium.com/@idrakmirzoyev/shopping-cart-module-e15dfcccfec0

const quantityInputs = document.querySelectorAll('.quantity-input');
const removeButtons = document.querySelectorAll('.remove-btn');
const totalElement = document.querySelector('.cart-total h3');

quantityInputs.forEach(input => {
    input.addEventListener('change', updateTotal);
});

removeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const cartItem = event.target.closest('.cart-item');
        if (cartItem) {
            cartItem.remove();
            updateTotal();
            updateCounter();
        }
    });
});

function updateTotal() {
    let total = 0;
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(item => {
        const priceText = item.querySelector('.product-details p').textContent;
        const price = parseFloat(priceText.replace('R$', '').replace(',', '.').trim());
        const quantityInput = item.querySelector('.quantity-input');
        const quantity = parseInt(quantityInput.value) || 0;
        total += price * quantity;
    });
    totalElement.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

function updateCounter() {
    let totalItems = 0;
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(item => {
        const quantityInput = item.querySelector('.quantity-input');
        totalItems += parseInt(quantityInput.value) || 0;
    });
    const counterElement = document.querySelector('.counter');
    counterElement.textContent = totalItems;
}

document.addEventListener("DOMContentLoaded", function () {
    let counter = 0;
    const counterElement = document.querySelector(".counter");

    function addToBasket() {
        counter++;
        counterElement.textContent = counter;
    }

    document.querySelectorAll(".product button").forEach(button => {
        button.addEventListener("click", function (event) {
            event.stopPropagation();
            addToBasket();
            
            const overlay = this.closest(".product").querySelector(".product_overlay");
            if (overlay) {
                overlay.classList.add('show');
                setTimeout(() => {
                    overlay.classList.remove('show');
                }, 1500);
            }
        });
    });
});