import { useState } from "react"
import { Image, Video, MapPin, Filter } from "lucide-react"
import "../styles/recommendations.css"

// Mock recommendation data
const allRecommendations = {
  images: [
    {
      id: 1,
      title: "Peaceful Mountain Landscape",
      description: "Calming natural scenery to reduce stress",
      url: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Mindfulness Practice Guide",
      description: "Visual guide for meditation postures",
      url: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Breathing Exercise Diagram",
      description: "Step-by-step visual guide for deep breathing",
      url: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Nature Walk Path",
      description: "Scenic trail for mindful walking",
      url: "/placeholder.svg?height=200&width=300",
    },
  ],
  videos: [
    { id: 1, title: '10-Minute Guided Meditation', description: 'Short meditation practice for beginners', thumbnail: '/placeholder.svg?height=200&width=300' },
    { id: 2, title: 'Understanding Anxiety', description: 'Expert explanation of anxiety triggers and management', thumbnail: '/placeholder.svg?height=200&width=300' },
    { id: 3, title: 'Yoga for Stress Relief', description: 'Gentle yoga sequence to release tension', thumbnail: '/placeholder.svg?height=200&width=300' },
    { id: 4, title: 'Yoga for Stress Relief', description: 'Gentle yoga sequence to release tension', thumbnail: '/placeholder.svg?height=200&width=300' },
  ],
  locations: [
    {
      id: 1,
      title: "Community Wellness Center",
      description: "123 Main St, Anytown - Support groups and counseling services",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 2,
      title: "Peaceful City Park",
      description: "456 Park Ave, Anytown - Natural setting for relaxation and reflection",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 3,
      title: "Mental Health Clinic",
      description: "789 Health Blvd, Anytown - Professional mental health services",
      image: "/placeholder.svg?height=150&width=150",
    },
  ],
}

// Recommendation categories based on assessment results
const resultBasedRecommendations = {
  "Strong Mental Wellbeing": {
    images: [0, 3], // indexes from allRecommendations.images
    videos: [0, 2], // indexes from allRecommendations.videos
    locations: [1], // indexes from allRecommendations.locations
  },
  "Generally Good Mental Health with Some Stress": {
    images: [0, 2],
    videos: [0, 2],
    locations: [1, 2],
  },
  "Moderate Stress or Mood Concerns": {
    images: [0, 1, 2],
    videos: [0, 1, 2],
    locations: [0, 1, 2],
  },
  "Significant Stress or Emotional Challenges": {
    images: [0, 1, 2, 3],
    videos: [0, 1, 2],
    locations: [0, 2],
  },
}

function Recommendations({ assessmentResults }) {
  const [activeFilter, setActiveFilter] = useState("all")

  // Filter recommendations based on assessment results if available
  const getFilteredRecommendations = () => {
    if (!assessmentResults) {
      return allRecommendations
    }

    const resultType = assessmentResults.title
    const recommendationIndexes =
      resultBasedRecommendations[resultType] || resultBasedRecommendations["Moderate Stress or Mood Concerns"]

    return {
      images: recommendationIndexes.images.map((index) => allRecommendations.images[index]),
      videos: recommendationIndexes.videos.map((index) => allRecommendations.videos[index]),
      locations: recommendationIndexes.locations.map((index) => allRecommendations.locations[index]),
    }
  }

  const recommendations = getFilteredRecommendations()

  return (
    <main className="recommendations-main">
      <div className="recommendations-content">
        <h1 className="page-title">Personalized Recommendations</h1>
        <p className="page-description">
          {assessmentResults
            ? `Based on your assessment results of "${assessmentResults.title}", we've curated these resources to support your mental well-being journey.`
            : "Explore these resources to support your mental well-being journey. Take our assessment for more personalized recommendations."}
        </p>

        <div className="filter-bar">
          <div className="filter-icon-container">
            <Filter className="filter-icon" />
          </div>
          <div className="filter-buttons">
            <button
              className={`filter-button ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              All
            </button>
            <button
              className={`filter-button ${activeFilter === "images" ? "active" : ""}`}
              onClick={() => setActiveFilter("images")}
            >
              Images
            </button>
            <button
              className={`filter-button ${activeFilter === "videos" ? "active" : ""}`}
              onClick={() => setActiveFilter("videos")}
            >
              Videos
            </button>
            <button
              className={`filter-button ${activeFilter === "locations" ? "active" : ""}`}
              onClick={() => setActiveFilter("locations")}
            >
              Locations
            </button>
          </div>
        </div>

        {(activeFilter === "all" || activeFilter === "images") && (
          <section className="recommendation-section" id="images-section">
            <div className="section-header">
              <Image className="section-icon" />
              <h2 className="section-title">Helpful Images</h2>
            </div>
            <div className="images-grid">
              {recommendations.images.map((image) => (
                <div key={image.id} className="image-card">
                  <div className="image-container">
                    <img src={image.url || "/placeholder.svg"} alt={image.title} className="recommendation-image" />
                  </div>
                  <div className="image-info">
                    <h3 className="image-title">{image.title}</h3>
                    <p className="image-description">{image.description}</p>
                    <button className="view-button">View Full Size</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {(activeFilter === "all" || activeFilter === "videos") && (
          <section className="recommendation-section" id="videos-section">
            <div className="section-header">
              <Video className="section-icon" />
              <h2 className="section-title">Recommended Videos</h2>
            </div>
            <div className="videos-grid">
              {recommendations.videos.map((video) => (
                <div key={video.id} className="video-card">
                  <div className="video-thumbnail-container">
                    <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="video-thumbnail" />
                    <div className="play-button-overlay">
                      <div className="play-button">
                        <div className="play-icon"></div>
                      </div>
                    </div>
                  </div>
                  <div className="video-info">
                    <h3 className="video-title">{video.title}</h3>
                    <p className="video-description">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {(activeFilter === "all" || activeFilter === "locations") && (
          <section className="recommendation-section" id="locations-section">
            <div className="section-header">
              <MapPin className="section-icon" />
              <h2 className="section-title">Nearby Locations</h2>
            </div>
            <div className="locations-list">
              {recommendations.locations.map((location) => (
                <div key={location.id} className="location-card">
                  <div className="location-image-container">
                    <img src={location.image || "/placeholder.svg"} alt={location.title} className="location-image" />
                  </div>
                  <div className="location-info">
                    <h3 className="location-title">{location.title}</h3>
                    <p className="location-description">{location.description}</p>
                    <button className="directions-button">Get Directions</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="personalized-note">
          <h2 className="note-title">Why We Recommended These</h2>
          <p className="note-description">
            {assessmentResults
              ? `These recommendations are based on your assessment results of "${assessmentResults.title}". We've selected resources that might help with the specific challenges you've mentioned.`
              : "These are general recommendations that may be helpful for mental wellbeing. For more personalized suggestions, please take our assessment."}
            Remember that these are suggestions, and you should choose what feels most helpful for your situation.
          </p>
        </section>
      </div>
    </main>
  )
}

export default Recommendations

