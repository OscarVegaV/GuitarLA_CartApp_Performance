// Import necessary modules and components

import { useState } from "react"; // React hook for managing state
import Header from "./components/Header"; // Import Header component
import Guitar from "./components/Guitar"; // Import Guitar component
import { db } from "./data/db"; // Import the database of guitars

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

  return (
  
    <>
    
      <Header />  

      <main className="container-xl mt-5">

        {/* Main heading for the collection */}
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {/* Render multiple Guitar components | Note: Only expressions are allowed inside JSX, not statements */}
          {data.map((guitar) => (
            <Guitar
            key={guitar.id}
            guitar={guitar}
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
