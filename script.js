const cartBtns = document.querySelectorAll(".cart-button");
const foodImage = document.getElementById("food-image");
const cartImage = document.getElementById("cart-image");
const cartQuantity = document.getElementById("cart-quantity");
let currentQuantity = 0;

document.addEventListener("DOMContentLoaded", () => {
    const cartQuantity = document.getElementById("cart-quantity");
    cartQuantity.innerText = `Your Cart (${currentQuantity})`; // Set to 0 on load
    
});

cartBtns.forEach(btn => {
    btn.addEventListener("click", function(event) {
        const button = event.target.closest(".cart-button"); // Ensure we are targeting the button element itself
        const isAdding = button.classList.contains("added-to-cart");

        // First-time Add to Cart button click
        if (!isAdding) {
            // Activate the button
            button.classList.add("added-to-cart", "active"); // apply active button CSS class
            

            // Check if the .cart-counter already exists
            let counter = button.querySelector(".cart-counter");
            // let currentQuantity = counter ? parseInt(counter.innerText) : 0;
            
            // If the .cart-counter doesn't exist yet, create it
            if (!counter) {
                // If counter doesn't exist yet, create it
                counter = document.createElement("span"); // Create the <span> element to hold the counter
                counter.classList.add("cart-counter"); // Add the class .cart-counter to it
                currentQuantity = 1; // set to 1 on first click
                counter.innerText = 1; 
                // cartQuantity.innerText = `Your Cart (${currentQuantity})`;
                button.appendChild(counter); // Append it to the button
            }

            cartQuantity.innerText = `Your Cart (1)`; // initialize cart with 1 item

    // Remove cart image and text
    const cartImage = document.querySelector("#cart-container .cart-image img");
    const cartText = document.querySelector("#added-items");
    if (cartImage) cartImage.style.display = "none";
    if (cartText) cartText.style.display = "none";

    // Apply styling changes
    const foodImage = button.closest(".image-container").querySelector("img");
    foodImage.style.border = "2px solid hsl(14, 86%, 42%)";
    button.style.backgroundColor = 'hsl(14, 86%, 42%)';

    // Add increment and decrement controls without breaking the counter
    const incrementBtn = document.createElement("div");
    incrementBtn.classList.add("circle", "increment-btn");
    incrementBtn.innerHTML = `<img src="assets/images/icon-increment-quantity.svg">`;

    const decrementBtn = document.createElement("div");
    decrementBtn.classList.add("circle", "decrement-btn");
    decrementBtn.innerHTML = `<img src="assets/images/icon-decrement-quantity.svg">`;

    // Clear button contents and re-append the elements
    button.innerHTML = "";
    button.append(decrementBtn, counter, incrementBtn);

    // Update total cart quantity after first-time click
    updateTotalCartQuantity();

    return; // Exit here to prevent further logic from running
}

        // Increment logic (for the `+` button)
        if (event.target.closest(".increment-btn")) {        
            const counter = button.querySelector(".cart-counter");
            let currentQuantity = parseInt(counter.innerText);
            currentQuantity++; // Increment the number
            // counter.innerText = currentQuantity; // Update the counter display
            counter.innerText = currentQuantity; // update counter display

            // update total cart quantity display
            updateTotalCartQuantity();
        }
            
        // decrement logic
        if (event.target.closest(".decrement-btn")) {
            const counter = button.querySelector(".cart-counter"); // Select the counter element
            let currentQuantity = parseInt(counter.innerText); // Parse the current quantity from the counter

            // Decrement the number, but first check if it's greater than 0
            if (currentQuantity > 0) {
                currentQuantity--; // Decrement the number
                counter.innerText = currentQuantity; // Update the counter display
                updateTotalCartQuantity();
                          
                // Check if currentQuantity is now 0
                if (currentQuantity === 0) {
                    resetCartButton(button); // reset when quantity is decreased to 0

                    // show cart image and text again if all items are removed
                    const cartImage = document.querySelector("#cart-container .cart-image img");
                    const cartText = document.querySelector("#added-items");
                    const foodImage = button.closest(".image-container").querySelector("img");
                    if (cartImage) cartImage.style.display = "block";
                    if (cartText) cartText.style.display = "block";
                    if (cartText) cartText.style.display = "flex";
                    if (foodImage) foodImage.style.border = "none";
                }
            }
        }
    });
});

// helper function to update the total cart quantity
function updateTotalCartQuantity() {
    let totalQuantity = 0;

    cartBtns.forEach((btn) => {
        const counter = btn.querySelector(".cart-counter");
        if (counter) {
            totalQuantity += parseInt(counter.innerText);
        }
    });

    cartQuantity.innerText = `Your Cart (${totalQuantity})`;
}

// Reset button logic
function resetCartButton(button) {
    button.style.backgroundColor = "hsl(20, 50%, 98%)";
    button.innerHTML = `<img src="assets/images/icon-add-to-cart.svg"> Add to Cart`;
    button.classList.remove("added-to-cart", "active");
}
