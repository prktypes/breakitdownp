import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StudyPage from "./pages/StudyPage";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <Router>
      <div className="min-h-screen font-newstar">
        <nav className="fixed top-0 left-0 right-0 z-50">
          <div className="bg-white/20 backdrop-blur-sm border-b border-white/30 shadow-sm">
            <div className="container mx-auto">
              <ul className="flex gap-6 justify-center items-center p-4">
                <li>
                  <Link 
                    to="/" 
                    className="text-black/80 hover:text-black transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/study" 
                    className="text-black/80 hover:text-black transition-colors"
                  >
                    Study
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/study" element={<StudyPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-5xl mb-6 font-newstar">Welcome to BreakItDown</h1>
      <p className="text-xl text-black/80 mb-8 max-w-2xl font-newstar">
        Your personalized learning platform that breaks down complex topics into simple, digestible pieces.
      </p>
      <Link to="/study">
        <Button className="text-lg px-6 py-2 font-newstar">
          Start Learning
        </Button>
      </Link>
    </div>
  );
}

export default App;
