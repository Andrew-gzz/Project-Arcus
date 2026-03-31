import { Link } from "react-router-dom";

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="container py-4" aria-label="breadcrumb">
      <ol className="breadcrumb mb-0">
        {items.map((item, index) => {
          // Comprobamos si es el último elemento del array para cambiar su estilo
          const isLast = index === items.length - 1;

          return (
            <li
              key={index}
              className={`breadcrumb-item ${isLast ? "active" : ""}`}
              aria-current={isLast ? "page" : undefined}
            >
              {/* Si es el último o no tiene URL, solo mostramos el texto. Si no, usamos Link */}
              {isLast || !item.url ? (
                <span className="text-warning">{item.name}</span>
              ) : (
                <Link
                  to={item.url}
                  className="text-warning text-decoration-none opacity-75"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
