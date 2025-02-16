import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AuthModal({ showModal, setShowModal, redirectPath }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:3000/api/login' : 'http://localhost:3000/api/signup';
    try {
      console.log('Submitting form to:', url);
      const response = await axios.post(url, { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setShowModal(false);
      navigate(redirectPath || '/study');
    } catch (error) {
      console.error('Error during authentication:', error);
      alert(error.response?.data?.error || 'An error occurred');
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 mb-4 border rounded"
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full mt-2 text-blue-500"
          >
            {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthModal; 