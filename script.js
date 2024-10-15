const cartBtns = document.querySelectorAll(".cart-button");
const foodImage = document.getElementById("food-image");
const cartImage = document.getElementById("cart-image");
const cartQuantity = document.getElementById("cart-quantity");
let currentQuantity = 0;

document.addEventListener("DOMContentLoaded", () => {
    const cartQuantity = document.getElementById("cart-quantity");
    cartQuantity.innerText = `Your Cart (${currentQuantity})`; // Set to 0 on load
    console.log("Initial quantity:", cartQuantity.innerText);
});

cartBtns.forEach(btn => {
    btn.addEventListener("click", function(event) {
        const button = event.target.closest(".cart-button"); // Ensure we are targeting the button element itself
        const isAdding = button.classList.contains("added-to-cart");

        // First-time Add to Cart button click (not yet active)
        if (!isAdding) {
            // Activate the button
            button.classList.add("added-to-cart");

            // Check if the .cart-counter already exists
            let counter = button.querySelector(".cart-counter");
            let currentQuantity = counter ? parseInt(counter.innerText) : 0;
            
            // If the .cart-counter doesn't exist yet, create it
            if (!counter) {
                // If counter doesn't exist yet, create it
                counter = document.createElement("span"); // Create the <span> element to hold the counter
                counter.classList.add("cart-counter"); // Add the class .cart-counter to it
                currentQuantity = 1; // set to 1 on first click
                counter.innerText = currentQuantity; 
                cartQuantity.innerText = `Your Cart (${currentQuantity})`;
                button.appendChild(counter); // Append it to the button
            } else {
                currentQuantity++;
                counter.innerText = currentQuantity; 
            }

            console.log(`Current quantity: ${currentQuantity}`); // Debugging log

            // Remove cart image if quantity is >= 1
            const cartImage = document.querySelector("#cart-container .cart-image img");
            const cartText = document.querySelector("#added-items");

            // Log to confirm if elements are found
console.log("Cart image:", cartImage); 
console.log("Cart text:", cartText); 

            if (cartImage) {
                cartImage.style.display = "none"; // remove the image when the first item is added
            }
            if (cartText) {  // remove the text in the cart when first item added
                cartText.style.display = "none";
            }

            // Apply border to food image
            const foodImage = button.closest(".image-container").querySelector("img");
            foodImage.style.border = "2px solid hsl(14, 86%, 42%)"; // Apply the burnt sienna border on initial add


            // Change to the active state
            button.style.backgroundColor = 'hsl(14, 86%, 42%)'; // Set background color to burnt sienna when active
            button.innerHTML = `
                <div class="circle decrement-btn">
                    <img src="assets/images/icon-decrement-quantity.svg"> 
                </div>
                <span class="cart-counter">1</span>
                <div class="circle increment-btn">
                    <img src="assets/images/icon-increment-quantity.svg">
                </div>
            `;
            button.classList.add("added-to-cart", "active"); // Add the active state class
            return; // Exit the function after the first-time add-to-cart click
        }

        // Increment logic (for the `+` button)
        if (event.target.closest(".increment-btn")) {

            

            const counter = button.querySelector(".cart-counter");
            let currentQuantity = parseInt(counter.innerText);

            currentQuantity++; // Increment the number
            counter.innerText = currentQuantity; // Update the counter display
            cartQuantity.innerText = `Your Cart (${currentQuantity})`;

            console.log("new quantity after incrementing:", currentQuantity);
            // Log current quantity after incrementing

        }

        // Decrement logic (for the `-` button)
        if (event.target.closest(".decrement-btn")) {
    
            const counter = button.querySelector(".cart-counter"); // Select the counter element
            let currentQuantity = parseInt(counter.innerText); // Parse the current quantity from the counter
            console.log("Current quantity before decrement:", currentQuantity); // Log the current quantity
            
            // Decrement the number, but first check if it's greater than 0
            if (currentQuantity > 0) {
                currentQuantity--; // Decrement the number
                counter.innerText = currentQuantity; // Update the counter display
                cartQuantity.innerText = `Your Cart (${currentQuantity})`; // Update the cart quantity display
                console.log("New quantity after decrement:", currentQuantity); // Log the new quantity
            
                // Check if currentQuantity is now 0
                if (currentQuantity === 0) {
                    const cartText = document.querySelector("#added-items");
                    cartText.style.display = "block";
                    cartText.style.display = "flex";
                    const cartImage = document.querySelector("#cart-container .cart-image img");
                    cartImage.style.display = "block";
                }
            }
        }
  
    });
});
