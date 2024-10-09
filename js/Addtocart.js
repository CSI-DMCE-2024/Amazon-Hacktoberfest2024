// Add event listeners to 'Add to Cart' buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        // Get the product details from the respective product card
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

// Cart array to store items with quantity
const cart = [];

// Function to add item to cart or update quantity if already in cart
function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    renderCart();
}

// Function to remove an item from the cart
function removeFromCart(productName) {
    const itemIndex = cart.findIndex(item => item.name === productName);

    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        renderCart();
    }
}

// Function to change quantity of an item in the cart
function updateQuantity(productName, newQuantity) {
    const item = cart.find(item => item.name === productName);

    if (item) {
        item.quantity = newQuantity > 0 ? newQuantity : 1; // Minimum quantity is 1
        renderCart();
    }
}

// Function to render(display) the items in cart
function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("total");

    cartItemsContainer.innerHTML = ''; // Clear existing items in cart
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        itemDiv.innerHTML = `
            ${item.name} - $${item.price} x 
            <input type="number" value="${item.quantity}" min="1" style="width: 50px;" 
                onchange="updateQuantity('${item.name}', this.value)">
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;

        cartItemsContainer.appendChild(itemDiv);
    });

    totalContainer.textContent = `Total: $${total.toFixed(2)}`;
}