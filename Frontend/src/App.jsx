import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StudyPage from "./pages/StudyPage";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="p-4 bg-white shadow-sm">
          <div className="container mx-auto">
            <ul className="flex gap-6 justify-center items-center">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/study" 
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Study
                </Link>
              </li>
              {/* Add more navigation links as needed */}
            </ul>
          </div>
        </nav>

        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/study" element={<StudyPage />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-5xl font-serif mb-6">Welcome to BreakItDown</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Your personalized learning platform that breaks down complex topics into simple, digestible pieces.
      </p>
      <Link to="/study">
        <Button className="text-lg px-6 py-2">
          Start Learning
        </Button>
      </Link>
    </div>
  );
}

export default App;