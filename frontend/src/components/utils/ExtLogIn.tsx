// 1. Importa tus iconos desde la carpeta assets
import FacebookIcon from "/src/assets/FacebookIcon.svg";
import GoogleIcon from "/src/assets/GoogleIcon.svg";
import AppleIcon from "/src/assets/AppleIcon.svg";

function ExtLogIn() {
  return (
    <>
      <p className="text-secondary text-center w-100 mb-4 fs-6">
        O continúa con
      </p>
      <div className="d-flex justify-content-center w-100 gap-4 mb-3">
        {/* Botón Facebook */}
        <button className="btn p-3 rounded-circle shadow-sm d-flex align-items-center justify-content-center">
          <img src={FacebookIcon} alt="Facebook" />
        </button>

        {/* Botón Google */}
        <button className="btn p-3 rounded-circle shadow-sm d-flex align-items-center justify-content-center">
          <img src={GoogleIcon} alt="Google" />
        </button>

        {/* Botón Apple */}
        <button className="btn p-3 rounded-circle shadow-sm d-flex align-items-center justify-content-center">
          <img src={AppleIcon} alt="Apple" />
        </button>
      </div>
    </>
  );
}

export default ExtLogIn;
