import BonCard from "../utils/BonCard";

type MembershipCardProps = {
  title: string;
  subtitle: string;
  img: string;
  buttonColor: string;
};

function MembershipCard({
  title,
  subtitle,
  img,
  buttonColor,
}: MembershipCardProps) {
  return (
    <div className="card text-bg-dark border-0 rounded-0">
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

        <button
          className="btn rounded-pill px-4 py-2"
          style={{
            backgroundColor: buttonColor,
            color: "white",
            width: 280,
          }}
        >
          Suscribirse ahora
        </button>
      </div>
    </div>
  );
}

export default function Membership() {
  const cards: MembershipCardProps[] = [
    {
      title: "START",
      subtitle: "Diseñado para empezar tu negocio",
      img: "src/assets/Membership1.png",
      buttonColor: "#47B921",
    },
    {
      title: "SELECT",
      subtitle: "El plan que todo Arcade necesita",
      img: "src/assets/Membership2.png",
      buttonColor: "#271DD6",
    },
    {
      title: "BONUS",
      subtitle: "Experiencias más allá del premium",
      img: "src/assets/Membership3.png",
      buttonColor: "#F31919",
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
        {/* Overlay oscuro */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(0,0,0,.75) 0%, rgba(0,0,0,.35) 55%, rgba(0,0,0,.15) 100%)",
          }}
        />

        <div className="container position-relative">
          {/* Texto principal */}
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
        {/* Panel de beneficios */}
        <BonCard></BonCard>

        {/* Texto inferior */}
        <div className="text-center mt-4">
          <h2 className="fw-bold" style={{ color: "#E9F400" }}>
            Tenemos el plan ideal para ti
          </h2>
        </div>
      </div>

      {/* Cartas de beneficios */}
      <div className="container my-4">
        <div className="d-flex flex-column gap-4">
          {cards.map((c) => (
            <MembershipCard
              key={c.title}
              title={c.title}
              subtitle={c.subtitle}
              img={c.img}
              buttonColor={c.buttonColor}
            />
          ))}
        </div>
      </div>
    </>
  );
}
