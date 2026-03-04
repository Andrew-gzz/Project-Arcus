import { Link } from "react-router-dom";

export default function Cart() {
  // Colores personalizados solicitados
  const colors = {
    headerTable: "#67B3B5",
    bgTable: "#2D2653",
    summaryHeader: "#1B5A7D",
    btnProceed: "#1B5A7D",
  };

  return (
    <div
      className="min-vh-100 text-light pb-5"
      style={{ backgroundColor: "#0b0819" }}
    >
      {/* Breadcrumb*/}
      <nav className="container py-4" aria-label="breadcrumb">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link
              to="/"
              className="text-warning text-decoration-none opacity-75"
            >
              Inicio
            </Link>
          </li>
          <li
            className="breadcrumb-item active text-warning"
            aria-current="page"
          >
            Carrito
          </li>
        </ol>
      </nav>

      <div className="container">
        <div className="row g-4">
          {/* SECCIÓN IZQUIERDA: TABLA DE PRODUCTOS */}
          <div className="col-lg-8">
            <div className="table-responsive rounded-4 overflow-hidden">
              <table className="table table-borderless align-middle mb-0 table-dark">
                <thead style={{ backgroundColor: colors.headerTable }}>
                  <tr className="text-dark">
                    <th className="py-3 ps-4">Producto</th>
                    <th className="py-3 text-center">Precio</th>
                    <th className="py-3 text-center">Cantidad</th>
                    <th className="py-3 text-center">Subtotal</th>
                    <th className="py-3"></th>
                  </tr>
                </thead>
                <tbody
                  style={{ backgroundColor: colors.bgTable }}
                  className="text-white"
                >
                  {/* Producto 1 */}
                  <tr className="border-bottom border-secondary border-opacity-25">
                    <td className="py-4 ps-4">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src="/src/assets/react.svg"
                          alt="game"
                          className="rounded"
                          style={{ width: "60px" }}
                        />
                        <div>
                          <p className="mb-0 text-warning fw-bold">Play game</p>
                          <small className="d-block opacity-75">
                            Color: Green
                          </small>
                          <small className="opacity-75">Size: 30</small>
                        </div>
                      </div>
                    </td>
                    <td className="text-center fw-bold">$ 11,70</td>
                    <td className="text-center">
                      <div
                        className="input-group input-group-sm mx-auto"
                        style={{ width: "100px" }}
                      >
                        <button className="btn btn-outline-light border-secondary opacity-50 text-dark bg-white">
                          -
                        </button>
                        <input
                          type="text"
                          className="form-control text-center bg-white border-secondary"
                          defaultValue="1"
                        />
                        <button className="btn btn-outline-light border-secondary opacity-50 text-dark bg-white">
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-center fw-bold">$ 11,70</td>
                    <td className="text-center pe-4">
                      <button className="btn btn-link text-warning p-0 text-decoration-none fs-5">
                        ⓧ
                      </button>
                    </td>
                  </tr>
                  {/* Producto 2 */}
                  <tr>
                    <td className="py-4 ps-4">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src="src/assets/react.svg"
                          alt="game"
                          className="rounded"
                          style={{ width: "60px" }}
                        />
                        <div>
                          <p className="mb-0 text-warning fw-bold">Play game</p>
                          <small className="d-block opacity-75">
                            Color: Black
                          </small>
                          <small className="opacity-75">Size: 30</small>
                        </div>
                      </div>
                    </td>
                    <td className="text-center fw-bold">$ 11,70</td>
                    <td className="text-center">
                      <div
                        className="input-group input-group-sm mx-auto"
                        style={{ width: "100px" }}
                      >
                        <button className="btn btn-outline-light border-secondary opacity-50 text-dark bg-white">
                          -
                        </button>
                        <input
                          type="text"
                          className="form-control text-center bg-white border-secondary"
                          defaultValue="1"
                        />
                        <button className="btn btn-outline-light border-secondary opacity-50 text-dark bg-white">
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-center fw-bold">$ 11,70</td>
                    <td className="text-center pe-4">
                      <button className="btn btn-link text-warning p-0 text-decoration-none fs-5">
                        ⓧ
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Botones inferiores de la tabla */}
            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-warning rounded-pill px-4 py-2 fw-bold text-dark">
                Seguir comprando
              </button>
              <button className="btn btn-outline-danger rounded-pill px-4 py-2 fw-bold border-2">
                Vaciar carrito
              </button>
            </div>
          </div>

          {/* SECCIÓN DERECHA: RESUMEN DE LA ORDEN */}
          <div className="col-lg-4">
            <div className="border border-secondary rounded-3 overflow-hidden h-100 d-flex flex-column">
              <div
                className="py-3 text-center fw-bold text-white"
                style={{ backgroundColor: colors.summaryHeader }}
              >
                Resumen de la orden
              </div>

              <div className="p-4 flex-grow-1">
                <div className="d-flex justify-content-between mb-3 fs-5">
                  <span>Subtotal</span>
                  <span className="fw-bold">$ 23,20</span>
                </div>

                <hr className="opacity-50" />

                <div className="d-flex justify-content-between mb-3 opacity-75">
                  <span>Envío</span>
                  <span>$ 23,20</span>
                </div>

                <div className="d-flex justify-content-between mb-4">
                  <span>Total estimado</span>
                  <span className="fw-bold">$ 23,20</span>
                </div>

                <button
                  className="btn w-100 py-3 rounded-pill text-white fw-bold mt-3"
                  style={{ backgroundColor: colors.btnProceed }}
                >
                  Proceder a la compra
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
