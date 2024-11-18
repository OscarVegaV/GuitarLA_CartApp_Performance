import Header from "./components/Header"; // Import Header component
import Guitar from "./components/Guitar"; // Import Guitar component

function App() {
  return (
    <>
      {/* Render the Header component */}
      <Header />  

      <main className="container-xl mt-5">
        {/* Main heading for the collection */}
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {/* Render multiple Guitar components */}
          <Guitar />
          <Guitar />
          <Guitar />
          <Guitar />
          <Guitar />
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
