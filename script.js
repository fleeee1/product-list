const cartBtns = document.querySelectorAll(".cart-button");

cartBtns.forEach(btn => {
    btn.addEventListener("click", function(event) {
        const button = event.target.closest(".cart-button"); // Ensure we are targeting the button element itself
        const isAdding = button.classList.contains("added-to-cart");

        // Prevent reverting to static state when clicking within the active area
        if (isAdding) {
            // Check if the click target is the increment or decrement button
            if (event.target.matches(".increment-btn") || event.target.matches(".decrement-btn")) {
                const counter = button.querySelector(".cart-counter");
                const incrementBtn = button.querySelector(".increment-btn");
                const decrementBtn = button.querySelector(".decrement-btn");

                if (!counter.innerText || isNaN(parseInt(counter.innerText))) {
                    counter.innerText = 1; // Initialize to 1
                }

                // Increment button functionality
                if (event.target.matches(".increment-btn")) {
                    event.stopPropagation(); // Prevent triggering the parent button's click event
                    let currentQuantity = parseInt(counter.innerText); // Get the current number in the counter

                    currentQuantity++; // Increment the number
                    counter.innerText = currentQuantity; // Update the counter display
                    console.log("Incremented: ", currentQuantity);
                }

                // Decrement button functionality
                if (event.target.matches(".decrement-btn")) {
                    event.stopPropagation(); // Prevent triggering the parent button's click event
                    let currentQuantity = parseInt(counter.innerText); // Get the current number in the counter
                    console.log('Decrement clicked! Current quantity:', currentQuantity);

                    // If quantity is greater than 1, decrement; otherwise, revert to static state
                    if (currentQuantity > 1) {
                        currentQuantity--; // Decrement the number
                        counter.innerText = currentQuantity; // Update the counter display
                        console.log("Decremented: ", currentQuantity);
                    } else {
                        // Revert to the static state
                        button.style.backgroundColor = ''; // Reset background color to default
                        button.innerHTML = `<img src="assets/images/icon-add-to-cart.svg"> Add to Cart`; // Change to original icon and text
                        button.classList.remove("added-to-cart", "active"); // Remove the active state class
                        console.log("Reverted to static state");
                    }
                }

                return; // Exit the function to prevent further actions
            } else {
                return; // Exit the function if clicking anywhere else when active
            }
        } else {
            // Change to the active state
            button.style.backgroundColor = 'hsl(14, 86%, 42%)'; // Set background color when active
            button.innerHTML = `
                <img src="assets/images/icon-decrement-quantity.svg" class="decrement-btn"> 
                <span class="cart-counter">1</span>
                <img src="assets/images/icon-increment-quantity.svg" class="increment-btn">
            `; // Add increment, cart-counter, and decrement icons
            button.classList.add("added-to-cart", "active"); // Add the active state class
        }
    });
});



