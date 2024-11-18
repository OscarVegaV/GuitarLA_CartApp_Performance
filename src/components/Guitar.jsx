export default function Guitar() {
  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      {/* Image of the guitar */}
      <div className="col-4">
        <img
          className="img-fluid"
          src="./public/img/guitar_01.jpg"
          alt="image guitar"
        />
      </div>
      {/* Guitar details */}
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">Lukather</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit quae
          labore odit magnam in autem nesciunt, amet deserunt
        </p>
        {/* Guitar price */}
        <p className="fw-black text-primary fs-3">$299</p>
        {/* Button to add the guitar to the cart */}
        <button type="button" className="btn btn-dark w-100">
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};
