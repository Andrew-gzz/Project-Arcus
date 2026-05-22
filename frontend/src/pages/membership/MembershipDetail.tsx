import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb, { BreadcrumbItem } from "../../components/utils/Breadcrumb";

type PlanType = "start" | "select" | "bonus";

interface PlanData {
  title: string;
  subtitle: string;
  price: number;
  img: string;
  buttonColor: string;
  description: string;
  features: string[];
}

const plans: Record<PlanType, PlanData> = {
  start: {
    title: "START",
    subtitle: "Diseñado para empezar tu negocio",
    price: 9.99,
    img: "src/assets/Membership1.png",
    buttonColor: "#47B921",
    description:
      "El plan perfecto para quienes están comenzando su aventura en el mundo de los arcades. Con acceso a herramientas básicas y soporte inicial, START te da todo lo que necesitas para dar tus primeros pasos.",
    features: [
      "Acceso a catálogo básico de productos",
      "Soporte por correo electrónico",
      "Descuentos exclusivos del 5%",
      "Acceso a comunidad de principiantes",
      "1 perfil de arcade personalizado",
    ],
  },
  select: {
    title: "SELECT",
    subtitle: "El plan que todo Arcade necesita",
    price: 19.99,
    img: "src/assets/Membership2.png",
    buttonColor: "#271DD6",
    description:
      "Nuestro plan más popular. SELECT ofrece un equilibrio perfecto entre funcionalidades avanzadas y precio accesible. Ideal para arcades en crecimiento que buscan expandir su alcance.",
    features: [
      "Todo lo incluido en START",
      "Acceso prioritario a nuevos lanzamientos",
      "Descuentos exclusivos del 15%",
      "Soporte prioritario 24/7",
      "Hasta 5 perfiles de arcade",
      "Estadísticas avanzadas de ventas",
      "Participación en eventos exclusivos",
    ],
  },
  bonus: {
    title: "BONUS",
    subtitle: "Experiencias más allá del premium",
    price: 39.99,
    img: "src/assets/Membership3.png",
    buttonColor: "#F31919",
    description:
      "La experiencia definitiva para arcades profesionales. BONUS incluye todas las funcionalidades premium, acceso anticipado a todo el contenido y beneficios exclusivos que no encontrarás en ningún otro plan.",
    features: [
      "Todo lo incluido en SELECT",
      "Acceso anticipado a todos los productos",
      "Descuentos exclusivos del 30%",
      "Soporte dedicado con agente personal",
      "Perfiles de arcade ilimitados",
      "Dashboard analytics premium",
      "Invitaciones a eventos VIP",
      "Merchandising exclusivo mensual",
      "Beta testing de nuevos productos",
    ],
  },
};

export default function MembershipDetail() {
  const { plan } = useParams<{ plan: string }>();
  const navigate = useNavigate();
  const [planData, setPlanData] = useState<PlanData | null>(null);

  useEffect(() => {
    if (plan && plans[plan as PlanType]) {
      setPlanData(plans[plan as PlanType]);
    }
  }, [plan]);

  if (!planData) {
    return (
      <div className="container text-white text-center py-5">
        <h2>Plan no encontrado</h2>
        <button
          className="btn btn-outline-light mt-3"
          onClick={() => navigate("/membership")}
        >
          Volver a membresías
        </button>
      </div>
    );
  }

  const breadcrumbPaths: BreadcrumbItem[] = [
    { name: "Inicio", url: "/" },
    { name: "Membresías", url: "/membership" },
    { name: planData.title },
  ];

  const handleBuyNow = () => {
    navigate("/payment", {
      state: {
        planType: plan as PlanType,
        planName: planData.title,
        planPrice: planData.price,
        planImg: planData.img,
      },
    });
  };

  return (
    <>
      <Breadcrumb items={breadcrumbPaths} />

      <div className="container text-white py-5">
        <div className="row g-5">
          <div className="col-lg-6">
            <div
              className="p-4 d-flex justify-content-center align-items-center rounded-4 border"
              style={{ backgroundColor: "#2D284A" }}
            >
              <img
                src={planData.img}
                alt={planData.title}
                className="img-fluid rounded-3"
                style={{ maxHeight: "450px", objectFit: "contain" }}
              />
            </div>
          </div>

          <div className="col-lg-6">
            <h1 className="fw-bold mb-2" style={{ color: planData.buttonColor }}>
              {planData.title}
            </h1>

            <h2 className="text-warning fw-bold mb-4">
              ${planData.price.toFixed(2)}/mes
            </h2>

            <p className="text-white-50 fs-5 mb-4">{planData.subtitle}</p>

            <div className="mb-4">
              <h5 className="text-secondary">Descripción</h5>
              <p className="lead">{planData.description}</p>
            </div>

            <div className="mb-4">
              <h5 className="text-secondary">Incluido en el plan</h5>
              <ul className="list-unstyled">
                {planData.features.map((feature, index) => (
                  <li key={index} className="mb-2 d-flex align-items-start gap-2">
                    <span className="text-success mt-1">&#10003;</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="opacity-25" />

            <button
              className="btn w-100 py-3 rounded-pill fw-bold text-white mt-4"
              style={{ backgroundColor: planData.buttonColor }}
              onClick={handleBuyNow}
            >
              Comprar ahora
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
