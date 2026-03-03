import Entrega from "/src/assets/Box.svg";
import Calidad from "/src/assets/Crown.svg";
import Garantia from "/src/assets/Shield.svg";
import ExpansionIcon from "/src/assets/Chevrons.svg";
import VarietyIcon from "/src/assets/Bookmark.svg";
import MaintenanceIcon from "/src/assets/Settings.svg";

/*Tarjeta de bonificaciones por membrecia */

export default function BonCard() {
  return (
    <>
      <div
        className="rounded-4 p-4 mt-5"
        style={{
          backgroundColor: "rgba(24, 92, 120, 0.95)",
          boxShadow: "0 12px 30px rgba(0,0,0,.35)",
        }}
      >
        <div className="row g-4 align-items-center">
          {/* Beneficio 1 */}
          <div className="col-12 col-md-4">
            <div className="d-flex gap-3 align-items-start">
              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: 46,
                  height: 46,
                  flex: "0 0 auto",
                }}
              >
                <img
                  src={ExpansionIcon}
                  alt="Icono Expansión"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div>
                <div className="text-white fw-bold fs-5">
                  Expande tu negocio
                </div>
                <div className="text-white-50 small">
                  Mejora tu arcade con nuestras membresías
                </div>
              </div>
            </div>{" "}
          </div>

          {/* Beneficio 2 */}
          <div className="col-12 col-md-4">
            <div className="d-flex gap-3 align-items-start">
              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: 46,
                  height: 46,
                  flex: "0 0 auto",
                }}
              >
                <img
                  src={VarietyIcon}
                  alt="Icono Variedad"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div>
                <div className="text-white fw-bold fs-5">Variedad amplia</div>
                <div className="text-white-50 small">
                  Renta múltiples máquinas de nuestra selección
                </div>
              </div>
            </div>
          </div>

          {/* Beneficio 3 */}
          <div className="col-12 col-md-4">
            <div className="d-flex gap-3 align-items-start">
              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: 46,
                  height: 46,
                  flex: "0 0 auto",
                }}
              >
                <img
                  src={MaintenanceIcon}
                  alt="Icono Mantenimiento"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div>
                <div className="text-white fw-bold fs-5">Mantenimiento</div>
                <div className="text-white-50 small">
                  Reparación de cualquier gabinete sin costos extra
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/*Tarjeta de bonificaciones por compra */

export function BonCard2() {
  return (
    <>
      {/* Panel de beneficios */}
      <div
        className="rounded-4 p-4 my-5"
        style={{
          backgroundColor: "rgba(24, 92, 120, 0.95)",
          boxShadow: "0 12px 30px rgba(0,0,0,.35)",
        }}
      >
        <div className="row g-4 align-items-center">
          {/* Beneficio 1 */}
          <div className="col-12 col-md-4">
            <div className="d-flex gap-3 align-items-start">
              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: 46,
                  height: 46,
                  flex: "0 0 auto",
                }}
              >
                <img
                  src={Garantia}
                  alt="Icono Expansión"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div>
                <div className="text-white fw-bold fs-5">Garantías</div>
                <div className="text-white-50 small">y devoluciones</div>
              </div>
            </div>{" "}
          </div>

          {/* Beneficio 2 */}
          <div className="col-12 col-md-4">
            <div className="d-flex gap-3 align-items-start">
              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: 46,
                  height: 46,
                  flex: "0 0 auto",
                }}
              >
                <img
                  src={Entrega}
                  alt="Icono Variedad"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div>
                <div className="text-white fw-bold fs-5">Entrega gratis</div>
                <div className="text-white-50 small">a partir de $600</div>
              </div>
            </div>
          </div>

          {/* Beneficio 3 */}
          <div className="col-12 col-md-4">
            <div className="d-flex gap-3 align-items-start">
              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: 46,
                  height: 46,
                  flex: "0 0 auto",
                }}
              >
                <img
                  src={Calidad}
                  alt="Icono Mantenimiento"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div>
                <div className="text-white fw-bold fs-5">Calidad</div>
                <div className="text-white-50 small">
                  la mejor calidad en productos
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
/*Tarjeta de marcas con las que trabajamos */
export function MarkCard() {
  return (
    <>
      <div className="bg-white text-dark rounded-4 p-4 shadow-sm">
        <div className="row align-items-center">
          <div className="col text-center">
            <img src="/src/assets/react.svg" alt="brand"></img>
          </div>
          <div className="col text-center">
            <img src="/src/assets/react.svg" alt="brand"></img>
          </div>
          <div className="col text-center">
            <img src="/src/assets/react.svg" alt="brand"></img>
          </div>
          <div className="col text-center">
            <img src="/src/assets/react.svg" alt="brand"></img>
          </div>
        </div>
      </div>
    </>
  );
}
