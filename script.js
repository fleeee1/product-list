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
    const isAdding = button.classList.contains("added-to-cart");
    const isIncrement = event.target.closest(".increment-btn");
    const isDecrement = event.target.closest(".decrement-btn");
    
    if (isIncrement) {
        incrementItem(button);
    } else if (isDecrement) {
        decrementItem(button);
    } else if (!isAdding) {
        addItemToCart(button);
    }
}

// First-time add to cart setup
function addItemToCart(button) {
    button.classList.add("added-to-cart", "active");
    currentQuantity = 1;
    
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
    
    // Show or hide the cart summary based on whether there are items in the cart
    const cartImage = document.querySelector("#cart-container .cart-image img");
    const cartSummary = document.getElementById("added-items");
    if (totalQuantity > 0) {
        if (cartImage) cartImage.style.display = "none"; // Hide empty cart image
        cartSummary.style.display = "block"; // Show cart summary
    } else {
        if (cartImage) cartImage.style.display = "block"; // Show empty cart image
        cartSummary.style.display = "none"; // Hide cart summary
    }
}

// Add item to cart summary display
function addToCartSummary(itemName, quantity) {
    const cartSummary = document.getElementById("added-items");
    let itemElement = document.querySelector(`.cart-item[data-item-name="${itemName}"]`);
    
    if (!itemElement) {
        // Create a new item element if it doesn't already exist
        itemElement = document.createElement("p");
        itemElement.classList.add("cart-item");
        itemElement.setAttribute("data-item-name", itemName);
        cartSummary.appendChild(itemElement);
    }
    
    itemElement.innerText = `${quantity} ${itemName}`;
}

// Update item quantity in cart summary display
function updateCartSummaryItem(itemName, quantity) {
    const itemElement = document.querySelector(`.cart-item[data-item-name="${itemName}"]`);
    if (itemElement) {
        itemElement.innerText = `${quantity} ${itemName}`;
    }
}

// Remove item from cart summary display
function removeFromCartSummary(itemName) {
    const itemElement = document.querySelector(`.cart-item[data-item-name="${itemName}"]`);
    if (itemElement) {
        itemElement.remove();
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
