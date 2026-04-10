interface EmptyProductsStateProps {
  title?: string;
  message?: string;
  imageSrc?: string;
}

export default function EmptyProductsState({
  title = "No encontramos productos",
  message = "Intenta con otra categoría o vuelve más tarde.",
  imageSrc = "https://i.pinimg.com/originals/49/f3/6f/49f36f4db09335470db668d81ddd048f.png",
}: EmptyProductsStateProps) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center py-5 my-4">
      <img
        src={imageSrc}
        alt="Sin productos"
        className="img-fluid mb-4"
        style={{ maxWidth: "220px", opacity: 0.95 }}
      />

      <h4 className="text-warning fw-bold mb-2">{title}</h4>
      <p className="text-light mb-0" style={{ maxWidth: "420px" }}>
        {message}
      </p>
    </div>
  );
}
