import Guitar from "./Guitar";

// Header component: Displays the logo, navigation, and a dropdown to view and manage cart items.
export default function Header({cart}) {

  // Render the cart dropdown: If the cart is empty, display a message. Otherwise, show cart items in a table.
  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          {/* Logo section */}
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/img/logo.svg"
                alt="image logo"
              />
            </a>
          </div>
          {/* Navigation section */}
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            {/* Cart icon */}
            <div className="cart">
              <img
                className="img-fluid"
                src="./public/img/cart.png"
                alt="imagen cart"
              />
              {/* Cart dropdown */}
              <div id="cart" className="bg-white p-3">
                {cart.length === 0 ? (
                  // Message for an empty cart
                  <p className="text-center">El carrito está vacío</p>
                ) : (
                  <>
                    {/* Table displaying cart items */}
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((guitar) => (
                          <tr key={guitar.id}>
                            {/* Image of the guitar in the cart */}
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/${guitar.image}.jpg`}
                                alt="image guitar"
                              />
                            </td>
                            <td>{guitar.name}</td> {/* Guitar name */}
                            <td className="fw-bold"> ${guitar.price}</td> {/* Price */}
                            {/* Quantity controls */}
                            <td className="flex align-items-start gap-4">
                              <button
                                type="button"
                                className="btn btn-dark"
                              >
                                -
                              </button>
                              {guitar.quantity}
                              <button
                                type="button"
                                className="btn btn-dark"
                              >
                                +
                              </button>
                            </td>
                            {/* Button to remove the item */}
                            <td>
                              <button
                                className="btn btn-danger"
                                type="button"
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
                {/* Total price */}
                <p className="text-end">
                  Total pagar: <span className="fw-bold">$899</span>
                </p>
                {/* Button to clear the cart */}
                <button className="btn btn-dark w-100 mt-3 p-2">
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}