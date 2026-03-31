import { STEPS } from "../../data/constants";

export default function Steps() {
  return (
    <section className="aip-how-section">
      <div className="aip-section-header">
        <h2>How It Works</h2>
      </div>

      <div className="aip-steps-grid">
        {STEPS.map((s) => (
          <div key={s.num} className="aip-step-card">
            <div className="aip-step-num">{s.num}</div>
            <div className="aip-step-title">{s.title}</div>
            <div className="aip-step-desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}