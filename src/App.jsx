// Import necessary modules and components

import Header from "./components/Header"; // Import Header component
import Guitar from "./components/Guitar"; // Import Guitar component
import Footer from "./components/Footer";
import { useCart } from "./hooks/useCart";//

// App component: Handles application state and renders Header, Guitar collection, and Footer
function App() {
  const {data, cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, isEmpty, cartTotal} = useCart();
  
  
  return (
  
    <>  
      {/* Header section */}  
      <Header 
        cart={cart} 
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
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
