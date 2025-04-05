import "../styles/resources.css"

function ResourceCard({ icon, title, description, type }) {
  return (
    <div className="resource-card">
      <div className="resource-header">
        <div className="resource-icon-container">{icon}</div>
        <div>
          <h3 className="resource-title">{title}</h3>
          <p className="resource-type">{type}</p>
        </div>
      </div>
      <div className="resource-body">
        <p className="resource-description">{description}</p>
      </div>
      <div className="resource-footer">
        <button className="resource-button">View Resource</button>
      </div>
    </div>
  )
}

export default ResourceCard

