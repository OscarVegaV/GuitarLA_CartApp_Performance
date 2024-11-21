// Import necessary modules and components
import { useState } from "react"; // React hook for managing state
import Header from "./components/Header"; // Import Header component
import Guitar from "./components/Guitar"; // Import Guitar component
import { db } from "./data/db"; // Import the database of guitars

// App component: Displays the guitar collection, manages the cart state, and renders the header and footer
function App() {

  // Initialize state with the database (db) data
  const [data, setData] = useState(db);// State to store guitar collection

  /*   // Initialize state with the database (db) data
  // Use with: import { useEffect } from "react";
  const [data, setData] = useState([]);// State to store guitar collection

  useEffect (() => {
    setData(db)); // Set data when component mounts
  }, [] )
  */

  // Cart state: stores selected items with their quantity
  const [cart, setCart] = useState([]); 

  // Function to add items to the cart
  // If the item is already in the cart, it increases its quantity by 1
  // Otherwise, it adds the item to the cart with an initial quantity of 1
  function addToCart(item) {
    // Check if the item already exists in the cart
    const itemExist = cart.findIndex(guitar => guitar.id === item.id );
    // If item exists, increase its quantity
    if (itemExist >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity++;
      setCart(updatedCart); // Update cart state with the modified cart
    } else {
      // If item doesn't exist, set its quantity to 1 and add it to the cart
      item.quantity = 1;      
      setCart([...cart, item]);
    }    
  }

  return (
  
    <>
    
      <Header  
        cart={cart}
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
            setCart={setCart}
            addToCart={addToCart} // Pass addToCart function as prop
            />
          ))}
        </div>
      </main>

      {/* Footer section */}
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App; // Export App component as default
