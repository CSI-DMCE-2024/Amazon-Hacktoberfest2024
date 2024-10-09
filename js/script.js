// Initialize cart array to store items with quantity
const cart = [];

// Add event listeners to 'Add to Cart' buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        // Get the product details from the respective product card
        const productName = this.parentElement.querySelector('h1').textContent;
        const productPrice = parseFloat(this.parentElement.querySelector('.price').textContent.replace('$', '')); // Convert price to number

        addToCart(productName, productPrice); // Add item to cart
        alert(`${productName} has been added to your cart!`);
    });
});

// Function to add item to cart or update quantity if already in cart
function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1; // If item exists, increase quantity
    } else {
        cart.push({ name: productName, price: price, quantity: 1 }); // If new item, add to cart
    }

    renderCart(); // Update cart display
}

// Function to remove an item from the cart
function removeFromCart(productName) {
    const itemIndex = cart.findIndex(item => item.name === productName);

    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1); // Remove item from cart
        renderCart(); // Update cart display
    }
}

// Function to change the quantity of an item in the cart
function updateQuantity(productName, newQuantity) {
    const item = cart.find(item => item.name === productName);

    if (item) {
        item.quantity = newQuantity > 0 ? newQuantity : 1; // Minimum quantity is 1
        renderCart(); // Update cart display
    }
}

// Function to render(display) the items in cart
function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("total");

    cartItemsContainer.innerHTML = ''; // Clear existing items in cart
    let total = 0; // Initialize total price

    // Loop through the cart items
    cart.forEach(item => {
        total += item.price * item.quantity; // Calculate total price

        // Create cart item display
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        itemDiv.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x 
            <input type="number" value="${item.quantity}" min="1" style="width: 50px;" 
                onchange="updateQuantity('${item.name}', this.value)">
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;

        // Append cart item to cart container
        cartItemsContainer.appendChild(itemDiv);
    });

    // Update total price display
    totalContainer.textContent = `Total: $${total.toFixed(2)}`;
}
