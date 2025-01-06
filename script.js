// Select all cart buttons and the cart quantity display
const cartBtns = document.querySelectorAll(".cart-button");
const cartQuantity = document.getElementById("cart-quantity");
let currentQuantity = 0;

// Initialize cart quantity display on page load
document.addEventListener("DOMContentLoaded", () => {
    cartQuantity.innerText = `Your Cart (${currentQuantity})`;
});

// Add hover effects to cart buttons
cartBtns.forEach(btn => {
    btn.addEventListener("mouseenter", () => btn.classList.add("hover"));
    btn.addEventListener("mouseleave", () => btn.classList.remove("hover"));
    btn.addEventListener("click", (event) => handleCartButtonClick(event, btn));
});

// Handle click events for increment and decrement buttons
function handleCartButtonClick(event, button) {
    const isIncrement = event.target.closest(".increment-btn");
    const isDecrement = event.target.closest(".decrement-btn");

    if (isIncrement) {
        incrementItem(button);
    } else if (isDecrement) {
        decrementItem(button);
    } else {
        addItemToCart(button);
    }
}

// First-time add to cart setup
function addItemToCart(button) {
    button.classList.add("added-to-cart", "active");
    button.style.backgroundColor = "hsl(14, 86%, 42%)";
    currentQuantity = 1;

    button.closest(".image-container").querySelector("#food-image").style.border = "2px solid hsl(14, 86%, 42%)";

    // Create counter display if it doesn't exist
    let counter = button.querySelector(".cart-counter");
    if (!counter) {
        counter = document.createElement("span");
        counter.classList.add("cart-counter");
        counter.innerText = currentQuantity;
        button.appendChild(counter);
    }

    // Update the button contents
    button.innerHTML = "";
    button.append(createButton("decrement-btn", "assets/images/icon-decrement-quantity.svg"));
    button.append(counter);
    button.append(createButton("increment-btn", "assets/images/icon-increment-quantity.svg"));

    // Add item to cart summary
    const specificInfo = button.closest(".product-all").querySelector(".specific-info").innerText;
    addToCartSummary(specificInfo, currentQuantity);

    // Update total quantity and appearance
    updateTotalCartQuantity();
    updateCartAppearance(button, true);
}

// Increment item quantity
function incrementItem(button) {
    const counter = button.querySelector(".cart-counter");
    currentQuantity = parseInt(counter.innerText) + 1;
    counter.innerText = currentQuantity;
    button.style.backgroundColor = "hsl(14, 86%, 42%)";

    updateTotalCartQuantity();

    // Update item quantity in cart summary
    const specificInfo = button.closest(".product-all").querySelector(".specific-info").innerText;
    updateCartSummaryItem(specificInfo, currentQuantity);
}

// Decrement item quantity and handle removal if it reaches zero
function decrementItem(button) {
    const counter = button.querySelector(".cart-counter");
    currentQuantity = Math.max(0, parseInt(counter.innerText) - 1);
    counter.innerText = currentQuantity;

    if (currentQuantity === 0) {
        resetCartButton(button);
        updateCartAppearance(button, false);
    } else {
        button.style.backgroundColor = "hsl(14, 86%, 42%)";
    }

    updateTotalCartQuantity();

    // Update or remove item from cart summary
    const specificInfo = button.closest(".product-all").querySelector(".specific-info").innerText;
    if (currentQuantity === 0) {
        removeFromCartSummary(specificInfo);
    } else {
        updateCartSummaryItem(specificInfo, currentQuantity);
    }
}

// Reset button appearance when quantity is zero
function resetCartButton(button) {
    button.classList.remove("added-to-cart", "active");
    button.style.backgroundColor = "";
    button.innerHTML = `<img src="assets/images/icon-add-to-cart.svg" alt="add to cart"> Add to Cart`;
}

// Update total cart quantity across all buttons
function updateTotalCartQuantity() {
    let totalQuantity = 0;
    document.querySelectorAll(".cart-counter").forEach(counter => {
        totalQuantity += parseInt(counter.innerText);
    });
    cartQuantity.innerText = `Your Cart (${totalQuantity})`;

    const cartImage = document.querySelector("#cart-container .cart-image img");
    const cartSummary = document.getElementById("added-items");
    if (totalQuantity > 0) {
        if (cartImage) cartImage.style.display = "none";
        cartSummary.style.display = "block";
        document.querySelector("#next").style.display = "none";
    } else {
        if (cartImage) cartImage.style.display = "block";
        cartSummary.style.display = "none";
        document.querySelector("#next").style.display = "flex";
    }
}

// Add item to cart summary display
function addToCartSummary(itemName, quantity) {
    const cartSummary = document.getElementById("added-items");
    let itemContainer = document.querySelector(`.cart-item-container[data-item-name="${itemName}"]`);

    if (!itemContainer) { //this adds the item names to the cart summary, 1x, etc.
        itemContainer = document.createElement("div");
        itemContainer.classList.add("cart-item-container");
        itemContainer.dataset.itemName = itemName;

        const itemElement = document.createElement("p");
        itemElement.classList.add("cart-item-name");
        itemElement.innerText = itemName;

        const itemQuantity = document.createElement("div");
        itemQuantity.classList.add("cart-item-quantity");
        itemQuantity.innerText = `${quantity}x`;

        itemContainer.appendChild(itemElement);
        itemContainer.appendChild(itemQuantity);
        cartSummary.appendChild(itemContainer);
    } else { //this makes sure that if you click somewhere OTHER than inc/dec buttons, nothing changes
        const itemQuantity = itemContainer.querySelector(".cart-item-quantity");
        itemQuantity.innerText = `${quantity}x`;
    }
}

// Update item quantity in cart summary display
function updateCartSummaryItem(itemName, quantity) {
    const itemContainer = document.querySelector(`.cart-item-container[data-item-name="${itemName}"]`);
    if (itemContainer) {
        const itemQuantity = itemContainer.querySelector(".cart-item-quantity");
        itemQuantity.innerText = `${quantity}x`;
    }
}

// Remove item from cart summary display
function removeFromCartSummary(itemName) {
    const itemContainer = document.querySelector(`.cart-item-container[data-item-name="${itemName}"]`);
    if (itemContainer) {
        itemContainer.remove();
    }
}

// Create increment or decrement button elements
function createButton(className, iconSrc) {
    const btn = document.createElement("div");
    btn.classList.add("circle", className);
    btn.innerHTML = `<img src="${iconSrc}" alt="${className}">`;
    return btn;
}

// Update cart appearance and visibility of related items
function updateCartAppearance(button, add) {
    const foodImage = button.closest(".image-container").querySelector("img");
    if (foodImage) {
        foodImage.style.border = add ? "2px solid hsl(14, 86%, 42%)" : "none";
    }
}
