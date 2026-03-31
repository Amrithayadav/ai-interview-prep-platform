import { TECH } from "../../data/constants";

export default function TechBar() {
  return (
    <div className="aip-tech-bar">
      <div className="aip-tech-pills">
        {TECH.map((t) => (
          <span key={t} className="aip-tech-pill">{t}</span>
        ))}
      </div>
    </div>
  );
}