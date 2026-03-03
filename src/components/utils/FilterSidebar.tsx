type FilterOption = {
  label: string;
  count?: number;
};

function SectionHeader({
  title,
  rightAction,
}: {
  title: string;
  rightAction?: React.ReactNode;
}) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-2">
      <div className="text-warning fw-semibold small">{title}</div>
      {rightAction}
    </div>
  );
}

function CheckboxRow({
  id,
  label,
  count,
  checked = false,
}: {
  id: string;
  label: string;
  count?: number;
  checked?: boolean;
}) {
  return (
    <div className="d-flex align-items-center justify-content-between py-1">
      <div className="form-check m-0 d-flex align-items-center gap-2">
        <input
          className="form-check-input arcus-check"
          type="checkbox"
          id={id}
          defaultChecked={checked}
        />
        <label
          className="form-check-label text-white-50 arcus-label"
          htmlFor={id}
        >
          {label}
        </label>
      </div>

      {typeof count === "number" && (
        <div className="text-white-50 small">{count}</div>
      )}
    </div>
  );
}

function ResetLink({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      className="btn btn-link p-0 text-danger arcus-reset"
      onClick={onClick}
    >
      Reset
    </button>
  );
}

function Divider() {
  return <hr className="arcus-hr my-3" />;
}

export default function FiltersSidebar() {
  const categories: FilterOption[] = [
    { label: "Todas las categorías", count: 10 },
    { label: "Tablet", count: 5 },
    { label: "Laptop", count: 5 },
    { label: "Headphones", count: 5 },
    { label: "Console", count: 5 },
    { label: "other", count: 5 },
  ];

  const availability: FilterOption[] = [
    { label: "In stock", count: 5 },
    { label: "Out of stock", count: 0 },
  ];

  const productType: FilterOption[] = [{ label: "Control", count: 5 }];

  const brand: FilterOption[] = [{ label: "Smart-watch", count: 5 }];

  const colors = [
    "#F2C94C",
    "#EB5757",
    "#56CCF2",
    "#27AE60",
    "#2F80ED",
    "#9B51E0",
    "#BB6BD9",
    "#F2994A",
    "#D1D5DB",
  ];

  return (
    <aside className="arcus-filter p-3 rounded-4">
      {/* Categorías */}
      <SectionHeader title="Categorías" rightAction={<ResetLink />} />
      <div className="mb-1">
        <CheckboxRow
          id="cat-all"
          label="Todas las categorías"
          count={10}
          checked
        />
        <CheckboxRow id="cat-tablet" label="Tablet" count={5} />
        <CheckboxRow id="cat-laptop" label="Laptop" count={5} />
        <CheckboxRow id="cat-headphones" label="Headphones" count={5} />
        <CheckboxRow id="cat-console" label="Console" count={5} />
        <CheckboxRow id="cat-other" label="other" count={5} />
      </div>

      <Divider />

      {/* Disponibilidad */}
      <SectionHeader title="Disponibilidad" rightAction={<ResetLink />} />
      <div className="text-white-50 small mb-1">0 selected</div>
      <CheckboxRow id="av-in" label="In stock" count={5} />
      <CheckboxRow id="av-out" label="Out of stock" count={0} />

      <Divider />

      {/* Tipo de producto */}
      <SectionHeader title="Tipo de producto" rightAction={<ResetLink />} />
      <div className="text-white-50 small mb-1">0 selected</div>
      <CheckboxRow id="type-control" label="Control" count={5} />

      <Divider />

      {/* Marca */}
      <SectionHeader title="Marca" rightAction={<ResetLink />} />
      <div className="text-white-50 small mb-1">0 selected</div>
      <CheckboxRow id="brand-sw" label="Smart-watch" count={5} />

      <Divider />

      {/* Color */}
      <SectionHeader title="Color" />
      <div className="text-white-50 small mb-2">0 selected</div>
      <div className="d-flex flex-wrap gap-2">
        {colors.map((c) => (
          <button
            key={c}
            type="button"
            className="arcus-color"
            style={{ backgroundColor: c }}
            aria-label={`Color ${c}`}
            title={c}
          />
        ))}
      </div>
    </aside>
  );
}
