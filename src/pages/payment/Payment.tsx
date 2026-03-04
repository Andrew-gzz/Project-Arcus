import { Link } from "react-router-dom";
import "../signin/SignIn.css";
export default function Payment() {
  return (
    <>
      {/*Breadcrumb */}
      <nav className="container mt-4" aria-label="breadcrumb">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link
              to="/"
              className="text-warning text-decoration-none opacity-75"
            >
              Inicio
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              to="/"
              className="text-warning text-decoration-none opacity-75"
            >
              Carrito
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/catalog" className="text-warning text-decoration-none">
              Pago
            </Link>
          </li>
        </ol>
      </nav>

      <div className="container">
        <div className="row">
          {/* Left Section */}
          <div className="col-12 col-lg-6 d-flex flex-column p-4 text-white justify-content-center">
            <h1 className="fw-bold mb-4">Detalles de compra</h1>
            {/* NOMBRE */}
            <div className="mb-4">
              <label className="form-label text-white mb-1">Nombre(s)</label>
              <input
                type="text"
                className="form-control arcus-input"
                placeholder="¿Cómo te llamas?"
              />
            </div>
            {/* APELLIDO */}
            <div className="mb-4">
              <label className="form-label text-white mb-1">Apellido(s)</label>
              <input
                type="text"
                className="form-control arcus-input"
                placeholder="Escribenos tus apellidos"
              />
            </div>
            {/* DIRECCION */}
            <div className="mb-4">
              <label className="form-label text-white mb-1">Dirección</label>
              <input
                type="text"
                className="form-control arcus-input"
                placeholder="¿Cual es tu dirección?"
              />
            </div>
            {/* APARTAMENTO CASA PISO */}
            <div className="mb-4">
              <label className="form-label text-white mb-1">
                Casa, apartamento, piso, etc. (opcional)
              </label>
              <input
                type="text"
                className="form-control arcus-input"
                placeholder="¿Donde vives?"
              />
            </div>
            {/* ESTADO */}
            <div className="mb-4">
              <label className="form-label text-white mb-1">Estado</label>
              <input
                type="text"
                className="form-control arcus-input"
                placeholder="¿En qué estado vives? NO, No es estado de la materia"
              />
            </div>
            {/* NUMERO DE TELEFONO */}
            <div className="mb-4">
              <label className="form-label text-white mb-1">
                Número de telefono
              </label>
              <input
                type="tel"
                className="form-control arcus-input"
                placeholder="Si no, ¿Cómo quieres conocer a Neo?"
              />
            </div>
            {/* CORREO */}
            <div className="mb-4">
              <label className="form-label text-white mb-1">Correo</label>
              <input
                type="email"
                className="form-control arcus-input"
                placeholder="Tu correo va aquí, ¿Quieres?"
              />
            </div>
            {/* GUARDAR INFORMACION PARA LA PROXIMA COMPRA */}
            <div className="d-flex justify-content-between align-items-center w-100 mb-5">
              <div className="form-check">
                <input
                  className="form-check-input bg-transparent border border-light"
                  type="checkbox"
                  id="flexCheckDefault"
                  style={{ borderColor: "#FFFFFF", borderWidth: "2px" }}
                />
                <label
                  className="form-check-label text-light fs-6"
                  htmlFor="flexCheckDefault"
                >
                  Guardar informacion para tu próxima compra.
                </label>
              </div>
            </div>
          </div>

          {/* Right Section: Resumen de compra */}
          <div className="col-12 col-lg-6 d-flex flex-column p-5 text-white justify-content-center">
            {/* gy-4 añade espacio uniforme entre cada fila de la columna */}
            <div className="row row-cols-1 text-white gy-4 ps-lg-5">
              <h2 className="fs-4 fw-bold mb-2">Resumen de la orden</h2>

              {/* ARTICULOS */}
              <div className="col">
                <div className="d-flex align-items-center justify-content-between py-2">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src="/src/assets/react.svg"
                      alt="item"
                      style={{ width: "35px" }}
                    />
                    <p className="mb-0">Articulo 1</p>
                  </div>
                  <p className="mb-0 fw-bold">$23.20</p>
                </div>

                <div className="d-flex align-items-center justify-content-between py-2">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src="/src/assets/react.svg"
                      alt="item"
                      style={{ width: "35px" }}
                    />
                    <p className="mb-0">Articulo 2</p>
                  </div>
                  <p className="mb-0 fw-bold">$23.20</p>
                </div>
              </div>

              {/* SUBTOTAL */}
              <div className="col">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 opacity-75">Subtotal:</p>
                  <p className="mb-0 fw-bold">$46.40</p>
                </div>
                <hr className="my-3 opacity-25" />
              </div>

              {/* ENVIO */}
              <div className="col">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 opacity-75">Envío:</p>
                  <p className="mb-0 fw-bold">$26.30</p>
                </div>
                <hr className="my-3 opacity-25" />
              </div>

              {/* TOTAL */}
              <div className="col">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 fs-5 fw-bold">Total:</p>
                  <p className="mb-0 fs-4 fw-bold text-warning">$72.70</p>
                </div>
              </div>

              {/* FORMA DE PAGO */}
              <div className="col pt-2">
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <input
                        className="form-check-input shadow-none"
                        type="radio"
                        name="paymentMethod"
                        id="creditCard"
                        defaultChecked
                        style={{
                          borderColor: "#67B3B5",
                          backgroundColor: "transparent",
                        }}
                      />
                      <label className="form-check-label" htmlFor="creditCard">
                        Tarjeta de Crédito
                      </label>
                    </div>
                    <div className="d-flex gap-2">
                      <img
                        src="/src/assets/Visa.png"
                        alt="visa"
                        style={{ height: "20px" }}
                      />
                      <img
                        src="/src/assets/Mastercard.png"
                        alt="master"
                        style={{ height: "20px" }}
                      />
                    </div>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-input shadow-none form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="paypal"
                      style={{
                        borderColor: "#67B3B5",
                        backgroundColor: "transparent",
                      }}
                    />
                    <label className="form-check-label" htmlFor="paypal">
                      Paypal
                    </label>
                  </div>
                </div>
              </div>

              {/* CUPON DE DESCUENTO */}
              <div className="col pt-3">
                <div className="row g-2">
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control bg-transparent rounded-pill px-4 py-2 border-secondary shadow-none cola"
                      placeholder="Cupón de descuento"
                    />
                  </div>
                  <div className="col-4">
                    <button className="btn btn-warning rounded-pill w-100 fw-bold py-2">
                      Aplicar cupón
                    </button>
                  </div>
                </div>
              </div>

              {/* BOTÓN FINAL */}
              <div className="col pt-4">
                <button
                  type="button"
                  className="btn w-100 py-3 rounded-4 fw-bold text-white shadow"
                  style={{ backgroundColor: "#1B5A7D", border: "none" }}
                >
                  Realizar compra
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
