import { useState } from "react"; // 1. Importamos useState
import { Link } from "react-router-dom";
import AddProduct from "../../components/modal/AddingProduct"; //Este es la funcion del modal
import Breadcrumb, { BreadcrumbItem } from "../../components/utils/Breadcrumb";

export default function Admin() {
  // 2. Definimos el estado para mostrar/ocultar el modal
  const [showModal, setShowModal] = useState(false);

  // 3. Funciones para abrir, cerrar y confirmar
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleConfirmAction = () => {
    console.log("Acción confirmada en el modal");
    // Aquí irá tu lógica futura para guardar el producto
    setShowModal(false);
  };
  const products = [
    {
      name: "Nintendo Switch 2",
      price: "$11,70",
      img: "/src/assets/react.svg",
      category: "Accesorios",
      stock: 50,
    },
    {
      name: "Control de Xbox",
      price: "$11,70",
      img: "/src/assets/react.svg",
      category: "Controles",
      stock: 0,
    },
    // Puedes repetir o agregar más objetos aquí
  ];

  const breadcrumbPaths: BreadcrumbItem[] = [
    { name: "Inicio", url: "/" },
    { name: "Lista de productos" },
  ];
  return (
    <>
      {/*Breadcrumb */}
      <Breadcrumb items={breadcrumbPaths}></Breadcrumb>

      {/*SECCION 1 */}
      <div className="container mb-4">
        <div className="row text-light">
          <div className="col-9">
            <h1 className="text-warning">Productos</h1>
          </div>
          <div className="col-3 text-end">
            <button
              type="button"
              className="btn bg-danger text-light rounded-pill btn-lg fw-bold"
              onClick={handleOpenModal}
            >
              + Añadir producto
            </button>
          </div>
          <div className="col-12">
            <p className="fs-4">Administra tus productos publicados</p>
          </div>

          {/*GRID DE PRODUCTOS */}
          <div className="col.12">
            <div className="row g-4">
              {[...products, ...products].map((product, index) => (
                <div className="col-6 col-lg-3" key={index}>
                  <div
                    className="card h-100 border border-1 rounded-4 overflow-hidden"
                    style={{ backgroundColor: "#1e1b33" }}
                  >
                    {/* Parte Superior: Imagen y Heart */}
                    <div
                      className="position-relative p-4 d-flex justify-content-center align-items-center"
                      style={{ backgroundColor: "#25223d", height: "200px" }}
                    >
                      <button
                        className="btn position-absolute top-0 end-0 m-3 rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          backgroundColor: "#4fd1c5",
                          width: "30px",
                          height: "30px",
                          border: "none",
                        }}
                      >
                        <small>❤️</small>
                      </button>
                      <img
                        src={product.img}
                        alt={product.name}
                        className="img-fluid"
                        style={{ maxHeight: "140px", objectFit: "contain" }}
                      />
                    </div>

                    {/* Parte Inferior: Info */}
                    <div
                      className="card-body text-white p-3"
                      style={{ backgroundColor: "#0C062E" }}
                    >
                      <div className="row">
                        <div className="col-8">
                          <h6 className="fw-bold">{product.name}</h6>
                        </div>
                        <div className="col-4">
                          <h6 className="badge bg-transparent text-wrap border border-warning text-warning rounded-pill">
                            {product.category}
                          </h6>
                        </div>
                        <div className="col-8">
                          <p className="text-warning fw-bold">
                            {product.price}
                          </p>
                        </div>
                        <div className="col-4">
                          <h6 className="badge text-bg-info text-wrap rounded-pill">
                            {product.stock > 0 ? "En stock" : "Agotado"}
                          </h6>
                        </div>
                        <div className="text-secondary small">
                          <p> Stock: {product.stock} unidades</p>
                        </div>
                        <div className="col-6 text-end">
                          <button
                            type="button"
                            className="btn btn-outline-info d-inline-flex align-items-center gap-2 rounded-pill"
                          >
                            Editar
                            <img
                              src="src/assets/edit.svg"
                              style={{ width: "16px" }}
                              alt="edit"
                            />
                          </button>
                        </div>
                        <div className="col-6 text-start">
                          <button
                            type="button"
                            className="btn btn-outline-danger d-inline-flex align-items-center gap-2 rounded-pill"
                          >
                            Eliminar
                            <img
                              src="src/assets/trash.svg"
                              style={{ width: "16px" }}
                              alt="delete"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/*Renderizamos el modal para editar o añadir producto*/}
      <AddProduct
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
      />
    </>
  );
}
