import React, { createContext, useState, useEffect } from 'react';

// Create the CartContext
export const CartContext = createContext();

// CartProvider component to manage cart state and logic
export const CartProvider = ({ children }) => {
  // Initialize cart state, either from localStorage or as an empty array
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cart]);

  // Add a product to the cart
  const addToCart = (product) => {
    console.log('Current cart before adding:', cart); // Debug: Log current cart state
    console.log('Adding to cart:', product); // Debug: Log the product being added

    // Ensure the product has a valid price and quantity
    const productWithDefaults = {
      ...product,
      Price: parseFloat(product.Price) || 0, // Convert price to a number
      quantity: product.quantity || 1, // Use the provided quantity or default to 1
    };

    // Check if the product (including its variant) already exists in the cart
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id && item.Title === product.Title
    );

    if (existingProductIndex !== -1) {
      // If the product exists, increment its quantity by the new quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += productWithDefaults.quantity;
      setCart(updatedCart);
    } else {
      // If the product does not exist, add it as a new row with the provided quantity
      setCart([...cart, productWithDefaults]);
    }
  };

  // Remove a product from the cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Update the quantity of a product in the cart
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      // If quantity is 0 or less, remove the product from the cart
      removeFromCart(productId);
    } else {
      // Update the quantity of the product
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate the total price of all items in the cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.Price * item.quantity, 0);
  };

  // Provide the cart state and functions to child components
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};