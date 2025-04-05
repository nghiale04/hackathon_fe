import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/global.css";

// Import components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import Resources from "./pages/Resources";
import Recommendations from "./pages/Recommendations";
import Emergency from "./pages/Emergency";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AssessmentResult from "./components/AssessmentResult";
import AssessmentHistory from "./pages/AssessmentHistory";

function App() {
  // App-level state that could be passed as props
  const [assessmentResults, setAssessmentResults] = useState(null);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="app-container">
                  <Header activePage="home" />
                  <Home />
                  <Footer />
                </div>
              </>
    
            }
          />
          <Route
            path="/assessment"
            element={
              <>
                <Header activePage="assessment" />
                <Assessment
                  onCompleteAssessment={setAssessmentResults}
                  previousResults={assessmentResults}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/resources"
            element={
              <>
                <Header activePage="resources" />
                <Resources />
                <Footer />
              </>
            }
          />
          <Route
            path="/emergency"
            element={
              <>
                <Header activePage="emergency" />
                <Emergency />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/result" element={<AssessmentResult />} />
          <Route path="/assessment-history" element={<AssessmentHistory />} />
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
