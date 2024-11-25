// Import necessary modules and components | useMemo hook for optimized state calculations (for Header.jsx)
import { useState, useEffect, useMemo } from "react"; // React hook for managing state
import { db } from "../data/db"; // Import the database of guitars

export const useCart = () => { 
    
    // Function to retrieve the cart from localStorage or initialize an empty cart
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  // State for guitar data (read-only, initialized with db)
  const [data] = useState(db);

  // State for the shopping cart
  const [cart, setCart] = useState(initialCart); 

  // Define maximum and minimum allowed quantities for items in the cart
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  // // Persist cart state to localStorage whenever it changes
  // Persist cart state to localStorage whenever it changes
useEffect(() => {
  const cartData = cart.map(({ id, quantity }) => {
    const guitar = db.find(guitar => guitar.id === id); // Encuentra el producto completo
    return { ...guitar, quantity }; // Mantén todos los datos del producto junto con la cantidad
  });
  localStorage.setItem('cart', JSON.stringify(cartData)); // Guardar el carrito completo
}, [cart]);

  // useEffect(() => {
  //   localStorage.setItem(
  //     'cart',
  //     JSON.stringify(cart.map(({ id, quantity }) => ({ id, quantity })))
  //   );
  // }, [cart]);
  

  // Function to add items to the cart
  // If the item is already in the cart, it increases its quantity by 1
  // Otherwise, it adds the item to the cart with an initial quantity of 1
  function addToCart(item) {
    // Check if the item already exists in the cart
    const itemExist = cart.findIndex(guitar => guitar.id === item.id );
    // If item exists, increase its quantity
    if (itemExist >= 0) {
      if (cart[itemExist].quantity >= MAX_ITEMS) return item;// Prevent exceeding max quantity
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity++;
      setCart(updatedCart);// Update cart state with the modified cart
    } else {
      // If item doesn't exist, set its quantity to 1 and add it to the cart
      item.quantity = 1;// Initialize quantity      
      setCart([...cart, item]);
    };
  };

  // Function to remove an item from the cart by its ID
  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
  };

  // Increase the quantity of an item in the cart
  function increaseQuantity(id) {
    const updatedCart = cart.map( item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      };
      return item; // Return unmodified items
    });
    setCart(updatedCart)
  };

  // Decrease the quantity of an item in the cart
  function decreaseQuantity(id) {
    const updatedCart = cart.map( item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      };
      return item;// Return unmodified items
    });
    setCart(updatedCart);    
  };

  // Clear the entire cart after user confirmation
  function clearCart(e) {
    const confirmClear = window.confirm('¿Seguro que deseas vaciar el carrito?');
    if (confirmClear) setCart([]);
  }; 

  // from Header
  // Check if the cart is empty using a derived state
  const isEmpty = useMemo(() => cart.length === 0, [cart]);

  // Calculate the total cost of items in the cart
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);

   
  // Render the cart
  // This function returns all the necessary data and methods that will be used across the app.
  // It includes the `data` (read-only), `cart` state, and all the utility functions (e.g., add, remove, increase, decrease quantities, etc.)
  // Additionally, it provides derived states like `isEmpty` and `cartTotal` for better control over cart logic.

  return {
   
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal
  }
}