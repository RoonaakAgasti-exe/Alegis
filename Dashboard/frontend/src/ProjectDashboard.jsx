import React from "react";

function ProjectDashboard() {
  const threat = { level: "Elevated", color: "#f59e0b" };
  const intrusions = { blocked: 27, delta: "+5 today" };
  const score = { value: 82, label: "Security Score" };
  const trendPoints = [18, 22, 19, 24, 28, 26, 31, 29, 34, 33, 37, 35];
  const events = [
    { id: 1, title: "Phishing email blocked", time: "2m ago", detail: "From suspicious domain mail-verify.com" },
    { id: 2, title: "Malicious URL detected", time: "18m ago", detail: "URL flagged by MURLD model" },
    { id: 3, title: "Dark web hit", time: "1h ago", detail: "Credential match found for employee email" },
    { id: 4, title: "Brute-force attempt", time: "3h ago", detail: "Multiple failed logins from unknown IP" },
  ];

  const w = 420;
  const h = 120;
  const padding = 8;
  const maxY = Math.max(...trendPoints) + 5;
  const minY = Math.min(...trendPoints) - 5;
  const norm = (v) => {
    const t = (v - minY) / (maxY - minY || 1);
    return h - padding - t * (h - padding * 2);
  };
  const step = (w - padding * 2) / (trendPoints.length - 1);
  const poly = trendPoints
    .map((v, i) => `${padding + i * step},${norm(v)}`)
    .join(" ");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
      <div className="model-card">
        <div className="card-header">
          <div className="card-icon" />
          <div className="status-badge">
            <span className="status-dot" />
            Overview
          </div>
        </div>
        <div className="card-content">
          <h3 className="card-title">Overall Threat Level</h3>
          <p className="card-description" style={{ marginTop: 8 }}>
            Current
          </p>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: threat.color,
                boxShadow: `0 0 10px ${threat.color}66`,
              }}
            />
            <span style={{ fontSize: 24, fontWeight: 700 }}>{threat.level}</span>
          </div>
        </div>
      </div>

      <div className="model-card">
        <div className="card-header">
          <div className="card-icon" />
          <div className="status-badge">
            <span className="status-dot" />
            Protection
          </div>
        </div>
        <div className="card-content">
          <h3 className="card-title">Intrusions Blocked</h3>
          <div style={{ marginTop: 12, display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 36, fontWeight: 800 }}>{intrusions.blocked}</span>
            <span style={{ color: "#10b981", fontWeight: 600 }}>{intrusions.delta}</span>
          </div>
          <p className="card-description" style={{ marginTop: 8 }}>Last 24 hours</p>
        </div>
      </div>

      <div className="model-card">
        <div className="card-header">
          <div className="card-icon" />
          <div className="status-badge">
            <span className="status-dot" />
            Score
          </div>
        </div>
        <div className="card-content">
          <h3 className="card-title">{score.label}</h3>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative", width: 72, height: 72 }}>
              <svg width="72" height="72">
                <circle cx="36" cy="36" r="30" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                <circle
                  cx="36"
                  cy="36"
                  r="30"
                  stroke="#10b981"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(score.value / 100) * 188.4} 188.4`}
                  transform="rotate(-90 36 36)"
                />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>
                {score.value}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700 }}>Good</div>
              <div style={{ color: "#9ca3af" }}>Higher is better</div>
            </div>
          </div>
        </div>
      </div>

      <div className="model-card" style={{ gridColumn: "1 / -1" }}>
        <div className="card-header">
          <div className="card-icon" />
          <div className="status-badge">
            <span className="status-dot" />
            Trends
          </div>
        </div>
        <div className="card-content">
          <h3 className="card-title">Security Activity Trends</h3>
          <div style={{ marginTop: 12 }}>
            <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 120 }}>
              <polyline points={poly} fill="none" stroke="#3b82f6" strokeWidth="2" />
              {trendPoints.map((v, i) => (
                <circle key={i} cx={padding + i * step} cy={norm(v)} r="2" fill="#3b82f6" />
              ))}
            </svg>
          </div>
        </div>
      </div>

      <div className="model-card" style={{ gridColumn: "1 / -1" }}>
        <div className="card-header">
          <div className="card-icon" />
          <div className="status-badge">
            <span className="status-dot" />
            Events
          </div>
        </div>
        <div className="card-content">
          <h3 className="card-title">Recent Security Events</h3>
          <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
            {events.map((e) => (
              <div key={e.id} style={{ display: "flex", alignItems: "start", gap: 12, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: "#60a5fa", marginTop: 6 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                    <span>{e.title}</span>
                    <span style={{ color: "#9ca3af", fontSize: 12 }}>{e.time}</span>
                  </div>
                  <div style={{ color: "#d1d5db", marginTop: 4, fontSize: 14 }}>{e.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDashboard;
