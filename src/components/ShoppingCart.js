import React, { useState } from 'react';

const ShoppingCart = () => {
  // State to manage the cart items
  const [cart, setCart] = useState([]);

  // Function to add an item to the cart
  const addItemToCart = (item) => {
    setCart([...cart, item]);
  };

  // Function to remove an item from the cart
  const removeItemFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  // Function to calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>

      {/* Render the cart items */}
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>

      {/* Display the total price */}
      <p>Total Price: ${calculateTotalPrice()}</p>

      {/* Example usage of addItemToCart */}
      <button onClick={() => addItemToCart({ id: 1, name: 'Product A', price: 20 })}>
        Add Product A to Cart
      </button>
    </div>
  );
};

export default ShoppingCart;