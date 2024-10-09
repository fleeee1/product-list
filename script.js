const cartBtns = document.querySelectorAll(".cart-button");
const foodImage = document.getElementById("food-image");
const cartQuantity = document.getElementById("cart-quantity");
const cartImage = document.getElementById("cart-image");

cartBtns.forEach(btn => {
    btn.addEventListener("click", function(event) {
        const button = event.target.closest(".cart-button"); // Ensure we are targeting the button element itself
        const isAdding = button.classList.contains("added-to-cart");

        // First-time Add to Cart button click (not yet active)
        if (!isAdding) {
            // Activate the button
            button.classList.add("added-to-cart");

            // Check if the .cart-counter already exists, and if not, create it
            let counter = button.querySelector(".cart-counter");
            
            // If the .cart-counter doesn't exist yet, create it
            if (!counter) {
                // If counter doesn't exist yet, create it
                counter = document.createElement("span"); // Create the <span> element to hold the counter
                counter.classList.add("cart-counter"); // Add the class .cart-counter to it
                counter.innerText = "1"; // Set initial quantity to 1
                button.appendChild(counter); // Append it to the button
            } else {
                counter.innerText = "1"; // Just in case the counter exists but quantity wasn't set
            }

            // set quantity to 1 on initial click
            let currentQuantity = 1;
            console.log(`Initial Current Quantity: ${currentQuantity}`);

            // Remove cart image if quantity is >= 1
            const cartImage = document.querySelector("#cart-container .cart-image img");
            if (cartImage) {
                cartImage.remove(); // Remove the image when the first item is added
                console.log('Cart image removed'); // Log removal
            }

            // Apply border to food image
            const foodImage = button.closest(".image-container").querySelector("img");
            foodImage.style.border = "2px solid hsl(14, 86%, 42%)"; // Apply the burnt sienna border on initial add
            console.log(`Border applied to food image`); // Log border application

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

            // Log current quantity after incrementing
            console.log(`Updated Current Quantity: ${currentQuantity}`); // Check the starting value
        }

        // Decrement logic (for the `-` button)
        if (event.target.closest(".decrement-btn")) {
            const counter = button.querySelector(".cart-counter");
            let currentQuantity = parseInt(counter.innerText);

            if (currentQuantity > 1) {
                currentQuantity--; // Decrement the number
                counter.innerText = currentQuantity; // Update the counter display
            } else {
                // Revert to the static state when quantity is 0
                button.style.backgroundColor = ''; // Reset background color to default
                button.innerHTML = `<img src="assets/images/icon-add-to-cart.svg"> Add to Cart`; // Change to original icon and text
                button.classList.remove("added-to-cart", "active"); // Remove the active state class

                // Remove the burnt sienna border
                const foodImage = button.closest(".image-container").querySelector("img");
                foodImage.style.border = ""; // Remove the burnt sienna border
                console.log('Cart is empty again, reverted to default');

                const cartImage = document.createElement("img");
                cartImage.src = "assets/images/illustration-empty-cart.svg";
                document.querySelector("#cart-container .cart-image").appendChild(cartImage);
                console.log("add image back");
                }
            }
        
    });
});
