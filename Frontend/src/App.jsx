import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StudyPage from "./pages/StudyPage";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function App() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [additionalReq, setAdditionalReq] = useState("");

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
            <Route path="/" element={
              <Home 
                subject={subject} 
                setSubject={setSubject} 
                topic={topic} 
                setTopic={setTopic} 
                additionalReq={additionalReq} 
                setAdditionalReq={setAdditionalReq} 
              />
            } />
            <Route path="/study" element={
              <StudyPage 
                subject={subject} 
                topic={topic} 
                setTopic={setTopic}
                additionalReq={additionalReq} 
              />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home({ subject, setSubject, topic, setTopic, additionalReq, setAdditionalReq }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center selection:bg-yellow-300">
      <h1 className="text-5xl mb-6 font-newstar">Welcome to <span className="bg-yellow-300 ">BreakItDown</span></h1>
      <p className="text-xl text-black/80 mb-8 max-w-2xl font-newstar">
        Your personalized learning platform that breaks down complex topics into simple, digestible pieces.
      </p>
      <input 
        type="text" 
        placeholder="Enter Subject" 
        value={subject} 
        onChange={(e) => setSubject(e.target.value)} 
        className="mb-4 p-2 border rounded"
      />
      <input 
        type="text" 
        placeholder="Enter Topic" 
        value={topic} 
        onChange={(e) => setTopic(e.target.value)} 
        className="mb-4 p-2 border rounded"
      />
      <input 
        type="text" 
        placeholder="Enter Additional Requirements" 
        value={additionalReq} 
        onChange={(e) => setAdditionalReq(e.target.value)} 
        className="mb-4 p-2 border rounded"
      />
      <Link to="/study">
        <Button>
          Start Learning
        </Button>
      </Link>
    </div>
  );
}

export default App;
