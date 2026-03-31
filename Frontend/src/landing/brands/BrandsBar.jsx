import { BRANDS } from "../../data/constants";

export default function BrandsBar() {
  return (
    <div className="aip-brands-bar">
      {BRANDS.map((b) => (
        <span key={b} className="aip-brand">{b}</span>
      ))}
    </div>
  );
}