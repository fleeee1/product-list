const cartBtns = document.querySelectorAll(".cart-button");

cartBtns.forEach(btn =>
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
            button.innerHTML = `<img src="assets/images/icon-decrement-quantity.svg"> 
            <span class="cart-counter">1</span>
            <img src="assets/images/icon-increment-quantity.svg">`; // Add increment, cart-counter, and decrement icons
            button.classList.add("added-to-cart", "active"); // Add the active state class
        }
    })
);






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

