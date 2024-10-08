document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.parentElement.querySelector('h1').textContent;
        const productPrice = this.parentElement.querySelector('.price').textContent;

        const cartItem = document.createElement('li');
        cartItem.textContent = `${productName} - ${productPrice}`;

        const cartItems = document.getElementById('cartItems') || document.createElement('ul');
        if (!document.getElementById('cartItems')) {
            cartItems.id = 'cartItems';
            document.getElementById('cart').appendChild(cartItems);
        }

        cartItems.appendChild(cartItem);

        alert(`${productName} has been added to your cart!`);
    });
});
