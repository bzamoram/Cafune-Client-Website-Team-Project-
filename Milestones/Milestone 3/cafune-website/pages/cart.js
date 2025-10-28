// CART SYSTEM

const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const cartIcon = document.getElementById("cart-icon");
const closeCart = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const progressBar = document.querySelector(".progress");
const freeShippingMsg = document.getElementById("free-shipping-msg");

let cart = [];

// Toggle cart visibility
cartIcon.addEventListener("click", () => openCart());
closeCart.addEventListener("click", () => closeCartDrawer());
cartOverlay.addEventListener("click", () => closeCartDrawer());

function openCart() {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
}

function closeCartDrawer() {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
}

// Add-to-cart button (only on product page)
const addToCartBtn = document.querySelector(".add-to-cart");
if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
        const item = {
            name: "Crochet Top",
            color: "White",
            size: "S",
            price: 25.00,
            image: "../images/crochettop.png",
            quantity: 1
        };
        addToCart(item);
        openCart();
    });
}

function addToCart(item) {
    const existing = cart.find(i => i.name === item.name && i.size === item.size);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push(item);
    }
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    // Update item count
    cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);

    // Update total
    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    cartTotal.textContent = `$${total.toFixed(2)} USD`;

    // Update free shipping progress
    const remaining = Math.max(200 - total, 0);
    const percent = Math.min((total / 200) * 100, 100);
    progressBar.style.width = percent + "%";
    freeShippingMsg.textContent = remaining > 0
        ? `You are $${remaining.toFixed(2)} USD away from free shipping.`
        : "You’ve qualified for free shipping!";

    // Render cart items
    cartItemsContainer.innerHTML = "";
    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <p>${item.name}</p>
                <p>Color: ${item.color}</p>
                <p>Size: ${item.size}</p>
                <p>$${item.price.toFixed(2)} USD</p>
                <div class="quantity">
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">REMOVE</button>
            </div>
        `;
        cartItemsContainer.appendChild(div);
    });
}

function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}
