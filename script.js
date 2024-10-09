const cartBtns = document.querySelectorAll(".cart-button");
const foodImage = document.getElementById("food-image");
const cartQuantity = document.getElementById("cart-quantity");
const cartImage = document.getElementById("cart-image");

cartBtns.forEach(btn => {
    btn.addEventListener("click", function(event) {
        const button = event.target.closest(".cart-button"); // Ensure we are targeting the button element itself
        const isAdding = button.classList.contains("added-to-cart");

        if (isAdding) {
            // Check if the click target is inside the increment or decrement circle
            if (event.target.closest(".increment-btn")) {
                const counter = button.querySelector(".cart-counter");
                let currentQuantity = parseInt(counter.innerText);
       
                currentQuantity++; // Increment the number
                counter.innerText = currentQuantity; // Update the counter display
       
                // Apply border if quantity is 1 or more
                if (currentQuantity >= 1) {
                    // Find the corresponding image inside the same .image-container
                    const foodImage = button.closest(".image-container").querySelector("img");
                    foodImage.style.border = "2px solid hsl(14, 86%, 42%)"; // Apply the burnt sienna border on initial add

                    console.log(`Current Quantity: ${currentQuantity}`); // Debugging

                    // Directly select the cart image
            const cartImage = document.querySelector("#cart-container .cart-image img");
            console.log(cartImage); // Check if cartImage is correctly referenced

                     // Check if the cartImage is present and remove it
            if (cartImage) {
                cartImage.remove(); // Remove the image if it exists
            }
        }
    }
            

            if (event.target.closest(".decrement-btn")) {
                const counter = button.querySelector(".cart-counter");
                let currentQuantity = parseInt(counter.innerText);

                if (currentQuantity > 1) {
                    currentQuantity--; // Decrement the number
                    counter.innerText = currentQuantity; // Update the counter display
                } else {
                    // Revert to the static state
                    button.style.backgroundColor = ''; // Reset background color to default
                    button.innerHTML = `<img src="assets/images/icon-add-to-cart.svg"> Add to Cart`; // Change to original icon and text
                    button.classList.remove("added-to-cart", "active"); // Remove the active state class

                    // Find the corresponding image inside the same .image-container
                    const foodImage = button.closest(".image-container").querySelector("img");
                    foodImage.style.border = ""; // Remove the burnt sienna border
                }
            }

            return; // Exit the function to prevent further actions
        } else {
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
            // Apply the border on the initial click
            const foodImage = button.closest(".image-container").querySelector("img");
            foodImage.style.border = "2px solid hsl(14, 86%, 42%)"; // Apply the burnt sienna border
        }
    });
});


