import "../styles/emergency.css"

function EmergencyCard({ icon, title, color, children }) {
  return (
    <div className={`emergency-card ${color}-card`}>
      <div className="card-header">
        <div className={`icon-container ${color}-icon-bg`}>{icon}</div>
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-content">{children}</div>
    </div>
  )
}

export default EmergencyCard

