// Import useMemo hook for optimized state calculations
import { useMemo } from "react";

// Header component: Displays navigation and a cart dropdown
export default function Header({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }) {

  // Check if the cart is empty using a derived state
  const isEmpty = useMemo(() => cart.length === 0, [cart]);

  // Calculate the total cost of items in the cart
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);

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
                src="/img/cart.png"
                alt="imagen cart"
              />
              {/* Cart dropdown */}
              <div id="cart" className="bg-white p-3">
                {isEmpty ? (
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
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/${guitar.image}.jpg`}
                                alt="image guitar"
                              />
                            </td>
                            <td>{guitar.name}</td>
                            <td className="fw-bold"> ${guitar.price}</td>
                            <td className="flex align-items-start gap-4">
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => decreaseQuantity(guitar.id)}
                              >
                                -
                              </button>
                              {guitar.quantity}
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => increaseQuantity(guitar.id)}
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => removeFromCart(guitar.id)}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-end">
                      Total pagar: <span className="fw-bold">${cartTotal}</span>
                    </p>
                  </>
                )}
                <button className="btn btn-dark w-100 mt-3 p-2" onClick={clearCart}>
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
