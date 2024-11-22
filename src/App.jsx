// Import necessary modules and components
import { useState, useEffect } from "react"; // React hook for managing state
import Header from "./components/Header"; // Import Header component
import Guitar from "./components/Guitar"; // Import Guitar component
import Footer from "./components/Footer";
import { db } from "./data/db"; // Import the database of guitars

// App component: Handles application state and renders Header, Guitar collection, and Footer
function App() {
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

  // Persist cart state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      'cart',
      JSON.stringify(cart.map(({ id, quantity }) => ({ id, quantity })))
    );
  }, [cart]);
  

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
  function clearCart() {
    const confirmClear = window.confirm('¿Seguro que deseas vaciar el carrito?');
    if (confirmClear) setCart([]);
  }; 
  return (
  
    <>  
      {/* Header section */}  
      <Header 
        cart={cart} 
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />  

      <main className="container-xl mt-5">

        {/* Main heading for the collection */}
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {/* Render multiple Guitar components | Note: Only expressions are allowed inside JSX, not statements */}
          {data.map((guitar) => (
            <Guitar
            key={guitar.id} // Unique key for each guitar
            guitar={guitar}  // Pass guitar details as props
            setCart={setCart} // Update cart state
            addToCart={addToCart} // Pass addToCart function as prop
            />
          ))}
        </div>
      </main>

      {/* Footer section */}
      < Footer />
    </>
  );
};

export default App; // Export App component as default
