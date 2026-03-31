interface ToastProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AddProduct({ show, onClose, onConfirm }: ToastProps) {
  if (!show) return null;

  return (
    <>
      {/* El Modal/Toast */}
      <div
        className="toast-container position-fixed top-50 start-50 translate-middle"
        style={{ zIndex: 2050 }} // Un z-index alto para estar arriba de todo
      >
        <div
          className="toast show shadow-lg border rounded-4 overflow-hidden"
          role="alert"
        >
          {/*CERRAR MODAL */}
          <div className="toast-header bg-dark text-white border-bottom border-secondary p-3">
            <strong className="me-auto fs-5">Añadir Producto</strong>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>
          {/*BODY DEL MODAL*/}
          <div className="toast-body bg-dark text-white p-4 text-start">
            {/* NOMBRE */}
            <div className="mb-4">
              <label className="form-label mb-1">Nombre del producto</label>
              <input
                type="text"
                className="form-control arcus-input"
                placeholder="--> Aquí va el nombre <--"
              />
            </div>
            {/* CATEGORÍA */}
            <div className="mb-4">
              <label className="form-label text-white-50 mb-1">Categoría</label>

              <select className="form-select arcus-input" defaultValue="">
                <option value="" disabled>
                  Selecciona la categoría
                </option>
                <option value="1">Videojuegos</option>
                <option value="2">Accesorios</option>
                <option value="3">Regalos</option>
              </select>
            </div>

            {/* URL / ARCHIVO DE IMAGEN */}
            <div className="mb-4">
              <label className="form-label text-white-50 mb-1">
                URL de la imagen
              </label>

              <input type="file" className="form-control arcus-input " />
            </div>
            {/* PRECIO Y STOCK EN LA MISMA LÍNEA */}
            <div className="row mb-4">
              {/* COLUMNA PRECIO */}
              <div className="col-6">
                <label className="form-label mb-1">Precio</label>
                <div className="d-flex align-items-center border-bottom border-secondary">
                  <span className="pe-2 text-secondary">$</span>
                  <input
                    type="number"
                    className="form-control arcus-input border-0" // Quitamos el border-bottom aquí para que no se duplique
                    placeholder="0.00"
                    style={{ borderBottom: "none !important" }}
                  />
                </div>
              </div>

              {/* COLUMNA STOCK CON BOTONES APILADOS */}
              <div className="col-6">
                <label className="form-label mb-1">Stock</label>
                <div className="position-relative">
                  <input
                    type="number"
                    className="form-control arcus-input pe-4" // pe-4 deja espacio para los botones
                    placeholder="0"
                  />
                  {/* CONTENEDOR DE BOTONES APILADOS */}
                  <div
                    className="position-absolute end-0 top-50 translate-middle-y d-flex flex-column pe-2"
                    style={{ height: "100%", justifyContent: "center" }}
                  >
                    <button
                      type="button"
                      className="btn p-0 text-white lh-1 border-0 mb-1"
                      style={{ fontSize: "10px", opacity: 0.7 }}
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      className="btn p-0 text-white lh-1 border-0"
                      style={{ fontSize: "10px", opacity: 0.7 }}
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* DESCRIPCIÓN */}
            <div className="mb-4">
              <label className="form-label mb-1">Descripción</label>
              <input
                type="text"
                className="form-control arcus-input"
                placeholder="¿De qué se trata tu producto?"
              />
            </div>

            {/*CONFIRMACION DEL MODAL */}
            <div className="d-flex justify-content-center gap-3">
              <button
                type="button"
                className="btn btn-danger px-4 rounded-pill fw-bold"
                onClick={onConfirm} // Ejecuta acción y cierra
              >
                Sí, continuar
              </button>
              <button
                type="button"
                className="btn btn-outline-light px-4 rounded-pill"
                onClick={onClose} // Cierra con Cancelar
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FONDO OSCURO*/}
      <div
        className="position-fixed top-0 start-0 w-100 vh-100 bg-black opacity-75"
        style={{ zIndex: 2000, cursor: "pointer" }}
        onClick={onClose} // <--- Esto hace que se cierre al hacer clic fuera
      ></div>
    </>
  );
}
