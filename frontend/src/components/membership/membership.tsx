import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BonCard from "../utils/BonCard";
import {
  getMySubscription,
  cancelSubscription,
} from "../../services/subscriptionService";

type PlanType = "start" | "select" | "bonus";

interface PlanInfo {
  title: string;
  subtitle: string;
  img: string;
  buttonColor: string;
  planType: PlanType;
}

type MembershipCardProps = PlanInfo & {
  isCurrentPlan: boolean;
  onCancel?: () => void;
  processing?: boolean;
};

function MembershipCard({
  title,
  subtitle,
  img,
  buttonColor,
  isCurrentPlan,
  planType,
  onCancel,
  processing,
}: MembershipCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="card text-bg-dark border-0 rounded-0"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/membership/${planType}`)}
    >
      <img
        src={img}
        className="card-img"
        alt={title}
        style={{ maxHeight: 220, objectFit: "cover" }}
      />
      <div className="card-img-overlay d-flex flex-column justify-content-center">
        <h5
          className="card-title fw-bold"
          style={{ letterSpacing: "0.08em", fontSize: 44 }}
        >
          {title}
        </h5>
        <p className="card-text fs-5 mb-3">{subtitle}</p>

        {isCurrentPlan ? (
          <div className="d-flex align-items-center gap-3">
            <span
              className="badge rounded-pill px-4 py-2"
              style={{
                backgroundColor: buttonColor,
                color: "white",
                fontSize: "1.1rem",
              }}
            >
              Plan actual
            </span>
            <button
              className="btn btn-outline-danger btn-sm rounded-pill"
              style={{ fontSize: "0.9rem" }}
              onClick={(e) => {
                e.stopPropagation();
                onCancel?.();
              }}
              disabled={processing}
            >
              {processing ? "Procesando..." : "Cancelar"}
            </button>
          </div>
        ) : (
          <button
            className="btn rounded-pill px-4 py-2"
            style={{
              backgroundColor: buttonColor,
              color: "white",
              width: 280,
            }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/membership/${planType}`);
            }}
          >
            Suscribirse ahora
          </button>
        )}
      </div>
    </div>
  );
}

export default function Membership() {
  const [currentPlan, setCurrentPlan] = useState<PlanType | null>(null);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const data = await getMySubscription();
        if (data) {
          setCurrentPlan(data.type as PlanType);
        }
      } catch {
        // Usuario no logueado o sin suscripción
      }
    };
    checkSubscription();
  }, []);

  const handleCancel = async () => {
    setProcessing(true);
    setMessage(null);

    try {
      await cancelSubscription();
      setCurrentPlan(null);
      setMessage("Suscripción cancelada correctamente.");
      setMessageType("success");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Error al cancelar la suscripción";
      setMessage(msg);
      setMessageType("error");
    } finally {
      setProcessing(false);
    }
  };

  const cards: PlanInfo[] = [
    {
      title: "START",
      subtitle: "Diseñado para empezar tu negocio",
      img: "src/assets/Membership1.png",
      buttonColor: "#47B921",
      planType: "start",
    },
    {
      title: "SELECT",
      subtitle: "El plan que todo Arcade necesita",
      img: "src/assets/Membership2.png",
      buttonColor: "#271DD6",
      planType: "select",
    },
    {
      title: "BONUS",
      subtitle: "Experiencias más allá del premium",
      img: "src/assets/Membership3.png",
      buttonColor: "#F31919",
      planType: "bonus",
    },
  ];

  return (
    <>
      <section
        className="py-5"
        style={{
          backgroundImage: "url('src/assets/MembresiaFondo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(0,0,0,.75) 0%, rgba(0,0,0,.35) 55%, rgba(0,0,0,.15) 100%)",
          }}
        />

        <div className="container position-relative">
          <div className="py-4" style={{ maxWidth: 520 }}>
            <h1
              className="text-white fw-bold mb-2"
              style={{ fontSize: "3rem" }}
            >
              Arcus Expansion
            </h1>
            <p className="text-white-50 fs-4 mb-0">
              Aumenta el nivel de tu Arcade
            </p>
          </div>
        </div>
      </section>
      <div className="container my-4">
        <BonCard></BonCard>

        <div className="text-center mt-4">
          <h2 className="fw-bold" style={{ color: "#E9F400" }}>
            Tenemos el plan ideal para ti
          </h2>
        </div>

        {message && (
          <div
            className={`alert alert-${messageType === "success" ? "success" : "danger"} mt-3`}
            role="alert"
          >
            {message}
          </div>
        )}

        {currentPlan && (
          <div className="text-center mt-3 mb-2">
            <p className="text-white-50 mb-0">
              Tu suscripción actual:{" "}
              <span className="fw-bold text-warning">
                {currentPlan.toUpperCase()}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="container my-4">
        <div className="d-flex flex-column gap-4">
          {cards.map((c) => (
            <MembershipCard
              key={c.title}
              title={c.title}
              subtitle={c.subtitle}
              img={c.img}
              buttonColor={c.buttonColor}
              planType={c.planType}
              isCurrentPlan={c.planType === currentPlan}
              onCancel={c.planType === currentPlan ? handleCancel : undefined}
              processing={c.planType === currentPlan ? processing : undefined}
            />
          ))}
        </div>
      </div>
    </>
  );
}
