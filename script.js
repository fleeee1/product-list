const cartBtns = document.querySelectorAll(".cart-button");

cartBtns.forEach(btn => {
    btn.addEventListener("click", function(event) {
        const button = event.target.closest(".cart-button"); // Ensure we are targeting the button element itself

        // Check if the button is currently in the "Add to Cart" state
        const isAdding = button.classList.contains("added-to-cart");

        // Toggle between states
        if (isAdding) {
            // Revert to the original state
            button.style.backgroundColor = ''; // Reset background color to default
            button.innerHTML = `<img src="assets/images/icon-add-to-cart.svg"> Add to Cart`; // Change to original icon and text
            button.classList.remove("added-to-cart", "active"); // Remove the active state class
        } else {
            // Change to the active state
            button.style.backgroundColor = 'hsl(14, 86%, 42%)'; // Set background color when active
            button.innerHTML = `
                <img src="assets/images/icon-decrement-quantity.svg" class="decrement-btn"> 
                <span class="cart-counter">1</span>
                <img src="assets/images/icon-increment-quantity.svg" class="increment-btn">
            `; // Add increment, cart-counter, and decrement icons
            button.classList.add("added-to-cart", "active"); // Add the active state class

            // Now that the button is active, add event listeners for the increment and decrement buttons
            const incrementBtn = button.querySelector(".increment-btn"); // Target the increment icon
            const decrementBtn = button.querySelector(".decrement-btn"); // Target the decrement icon
            const counter = button.querySelector(".cart-counter"); // Target the counter element

            // Log to see if decrementBtn is found
            console.log('Decrement button:', decrementBtn);

            // Increment button functionality
            incrementBtn.addEventListener("click", function(event) {
                event.stopPropagation(); // Prevents triggering the parent button's click event
                let currentQuantity = parseInt(counter.innerText); // Get the current number in the counter
                currentQuantity++; // Increment the number
                counter.innerText = currentQuantity; // Update the counter display
            });

            // Decrement button functionality
            decrementBtn.addEventListener("click", function(event) {
                event.stopPropagation(); // Prevents triggering the parent button's click event
                let currentQuantity = parseInt(counter.innerText); // Get the current number in the counter
                console.log('Decrement clicked! Current quantity:', currentQuantity); // Check if decrement is triggered
                currentQuantity--; // Decrement the number
                counter.innerText = currentQuantity; // Update the counter display
            });
        }
    });
});






// //1.function declaration
// function addCartItem() {
//     console.log("item added");
// }

// //2.function expression
// const addCartItem = function() {
//     console.log("item added");
// }

// //3.arrow function
// const addCartItem = bYear => 2024-bYear;

