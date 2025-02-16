import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StudyPage from "./pages/StudyPage";
import AdminDashboard from "./pages/AdminDashboard"; // Import the AdminDashboard component
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from 'axios';
import './App.css'; // Add your CSS for modal styling
import { useNavigate } from 'react-router-dom'; // Make sure this is imported
import { clearTokenIfExpired } from './utils/auth';
import AuthModal from './components/AuthModal';

function App() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [additionalReq, setAdditionalReq] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const navigate = useNavigate(); // Initialize useNavigate

  const handleStartLearning = () => {
    console.log('Start Learning clicked');
    // Check if token exists
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, showing modal');
      setRedirectPath('/study');
      setShowModal(true);
      return;
    }
    
    // If token exists, check if expired
    if (clearTokenIfExpired()) {
      console.log('Token expired, showing modal');
      setRedirectPath('/study');
      setShowModal(true);
      return;
    }
    
    navigate('/study');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:3000/api/login' : 'http://localhost:3000/api/signup';
    try {
      const response = await axios.post(url, { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token); // Store token
      setShowModal(false); // Close modal
      navigate('/study'); // Redirect to study page
    } catch (error) {
      console.error('Error during authentication', error);
      alert(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
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
                  to="/dashboard" 
                  className="text-black/80 hover:text-black transition-colors"
                >
                </Link>
                <Link 
                  to="/admin" 
                  className="text-black/80 hover:text-black transition-colors"
                >
                  DashBoard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <AuthModal showModal={showModal} setShowModal={setShowModal} redirectPath={redirectPath} />

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
              onStartLearning={handleStartLearning}
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
          <Route path="/admin" element={<AdminDashboard />} /> {/* Add Admin Dashboard Route */}
        </Routes>
      </main>
    </div>
  );
}

function Home({ subject, setSubject, topic, setTopic, additionalReq, setAdditionalReq, onStartLearning }) {
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
        placeholder="Anything Else?" 
        value={additionalReq} 
        onChange={(e) => setAdditionalReq(e.target.value)} 
        className="mb-4 p-2 border rounded"
      />
      <Button onClick={onStartLearning}>Start Learning</Button>
    </div>
  );
}

export default App;