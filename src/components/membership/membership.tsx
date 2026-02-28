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
      buttonColor: "#39B54A",
    },
    {
      title: "SELECT",
      subtitle: "El plan que todo Arcade necesita",
      img: "src/assets/Membership2.png",
      buttonColor: "#2B2DE2",
    },
    {
      title: "BONUS",
      subtitle: "Experiencias más allá del premium",
      img: "src/assets/Membership3.png",
      buttonColor: "#E73124",
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

          {/* Panel de beneficios */}
          <div
            className="rounded-4 p-4 mt-5"
            style={{
              backgroundColor: "rgba(24, 92, 120, 0.95)",
              boxShadow: "0 12px 30px rgba(0,0,0,.35)",
            }}
          >
            <div className="row g-4 align-items-center">
              <div className="col-12 col-md-4">
                <div className="d-flex gap-3 align-items-start">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: 46,
                      height: 46,
                      backgroundColor: "rgba(255,255,255,.08)",
                      color: "#E9F400",
                      fontSize: 26,
                      flex: "0 0 auto",
                    }}
                  >
                    ⏫
                  </div>
                  <div>
                    <div className="text-white fw-bold fs-5">
                      Expande tu negocio
                    </div>
                    <div className="text-white-50 small">
                      Mejora tu arcade con nuestras membresías
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="d-flex gap-3 align-items-start">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: 46,
                      height: 46,
                      backgroundColor: "rgba(255,255,255,.08)",
                      color: "#E9F400",
                      fontSize: 26,
                      flex: "0 0 auto",
                    }}
                  >
                    🔖
                  </div>
                  <div>
                    <div className="text-white fw-bold fs-5">
                      Variedad amplia
                    </div>
                    <div className="text-white-50 small">
                      Renta múltiples máquinas de nuestra selección
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="d-flex gap-3 align-items-start">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: 46,
                      height: 46,
                      backgroundColor: "rgba(255,255,255,.08)",
                      color: "#E9F400",
                      fontSize: 26,
                      flex: "0 0 auto",
                    }}
                  >
                    ⚙️
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

          {/* Texto inferior */}
          <div className="text-center mt-4">
            <h2 className="fw-bold" style={{ color: "#E9F400" }}>
              Tenemos el plan ideal para ti
            </h2>
          </div>
        </div>
      </section>
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
