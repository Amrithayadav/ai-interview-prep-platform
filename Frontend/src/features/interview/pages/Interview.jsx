import React, { useState, useEffect } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview.js";
import { useAuth } from "../../auth/hooks/useAuth.js";
import { useNavigate, useParams } from "react-router-dom";

// ✅ ObjectId validator
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

const NAV_ITEMS = [
  {
    id: "technical",
    label: "Technical Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "behavioral",
    label: "Behavioral Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "roadmap",
    label: "Road Map",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="q-card">
      <div className="q-card__header" onClick={() => setOpen((o) => !o)}>
        <span className="q-card__index">Q{index + 1}</span>
        <p className="q-card__question">{item?.question}</p>
        <span
          className={`q-card__chevron ${open ? "q-card__chevron--open" : ""}`}
        >
          ▼
        </span>
      </div>

      {open && (
        <div className="q-card__body">
          <div className="q-card__section">
            <span className="q-card__tag q-card__tag--intention">
              Intention
            </span>
            <p>{item?.intention}</p>
          </div>
          <div className="q-card__section">
            <span className="q-card__tag q-card__tag--answer">
              Model Answer
            </span>
            <p>{item?.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const RoadMapDay = ({ day }) => (
  <div className="roadmap-day">
    <div className="roadmap-day__header">
      <span className="roadmap-day__badge">Day {day?.day}</span>
      <h3 className="roadmap-day__focus">{day?.focus}</h3>
    </div>

    <ul className="roadmap-day__tasks">
      {day?.tasks?.map((task, i) => (
        <li key={i}>
          <span className="roadmap-day__bullet" />
          {task}
        </li>
      ))}
    </ul>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical");
  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const { interviewId } = useParams();

  // ✅ Safe API call
  useEffect(() => {
    if (!interviewId || !isValidObjectId(interviewId)) return;
    getReportById(interviewId);
  }, [interviewId, getReportById]);

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate("/login");
  };

  // ❌ Invalid ID UI
  if (!interviewId || !isValidObjectId(interviewId)) {
    return (
      <main className="loading-screen">
        <h1>Invalid interview ID. Please generate a new report.</h1>
      </main>
    );
  }

  // ⏳ Loading UI
  if (loading && !report) {
    return (
      <main className="loading-screen">
        <h1>Loading your interview plan...</h1>
      </main>
    );
  }

  const scoreColor =
    report?.matchScore >= 80
      ? "score--high"
      : report?.matchScore >= 60
        ? "score--mid"
        : "score--low";

  return (
    <div className="interview-page">
      <div className="interview-layout">
        {/* ── Left Nav ── */}
        <nav className="interview-nav">
          <div className="nav-content">
            <p className="interview-nav__label">Sections</p>

            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`interview-nav__item ${activeNav === item.id ? "interview-nav__item--active" : ""}`}
                onClick={() => setActiveNav(item.id)}
              >
                <span className="interview-nav__icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => interviewId && getResumePdf(interviewId)}
            className="button primary-button"
          >
            Download Resume
          </button>
        </nav>

        <div className="interview-divider" />

        {/* ── Center Content ── */}
        <main className="interview-content">
          {activeNav === "technical" && (
            <section>
              <div className="content-header">
                <h2>Technical Questions</h2>
                <span>{report?.technicalQuestions?.length || 0} questions</span>
              </div>

              <div className="q-list">
                {report?.technicalQuestions?.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "behavioral" && (
            <section>
              <div className="content-header">
                <h2>Behavioral Questions</h2>
                <span>
                  {report?.behavioralQuestions?.length || 0} questions
                </span>
              </div>

              <div className="q-list">
                {report?.behavioralQuestions?.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "roadmap" && (
            <section>
              <div className="content-header">
                <h2>Preparation Road Map</h2>
                <span>{report?.preparationPlan?.length || 0}-day plan</span>
              </div>

              <div className="roadmap-list">
                {report?.preparationPlan?.map((day) => (
                  <RoadMapDay key={day.day} day={day} />
                ))}
              </div>
            </section>
          )}
        </main>

        <div className="interview-divider" />

        {/* ── Right Sidebar ── */}
        <aside className="interview-sidebar">
          {/* ── User Profile Avatar (Top) ── */}
          <div className="profile-section">
            <div className="profile-avatar">
              <span>{user?.username?.charAt(0)?.toUpperCase() || "U"}</span>
            </div>
          </div>

          <div className="match-score">
            <p>Match Score</p>

            <div className={`match-score__ring ${scoreColor}`}>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                {/* Background Circle */}
                <circle
                  className="ring-background"
                  cx="50"
                  cy="50"
                  r="45"
                />
                {/* Progress Circle */}
                <circle
                  className="ring-progress"
                  cx="50"
                  cy="50"
                  r="45"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 - (report?.matchScore / 100) * 2 * Math.PI * 45}`}
                />
              </svg>
              <div className="score-text">
                <span className="score-value">{report?.matchScore || 0}</span>
                <span className="score-pct">%</span>
              </div>
            </div>
          </div>

          <div className="sidebar-divider" />

          <div className="skill-gaps">
            <p>Skill Gaps</p>

            <div className="skill-gaps__list">
              {report?.skillGaps?.map((gap, i) => (
                <span
                  key={i}
                  className={`skill-tag skill-tag--${gap?.severity}`}
                >
                  {gap?.skill}
                </span>
              ))}
            </div>
          </div>

          {/* ── Logout Button (Bottom) ── */}
          <button 
            onClick={handleLogoutClick}
            className="logout-button"
          >
            Logout
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Interview;
