import { Link } from "react-router";

export default function AppBrand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={`app-brand${compact ? " app-brand--compact" : ""}`} to="/">
      <span className="app-brand__mark" aria-hidden="true">
        <span />
        <span />
      </span>
      <span>Plateful</span>
    </Link>
  );
}
