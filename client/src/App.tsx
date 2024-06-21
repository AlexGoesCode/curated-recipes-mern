import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import FlowFooter from './components/Footer';
import DesktopImage from './assets/dim-spices.png';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/Routes';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [count, setCount] = useState(0);

  const fetchServer = async () => {
    const response = await fetch('http://localhost:5022/api/test');
    const result = await response.json();
    console.log('result :>> ', result);
  };

  useEffect(() => {
    fetchServer();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div
          className='relative h-screen bg-cover bg-center flex flex-col min-h-screen saturate-100'
          style={{ backgroundImage: `url(${DesktopImage})` }}
        >
          <div className='fixed'></div>
          <Navbar />
          <div className='flex-grow'>
            <Routes />
          </div>
          <FlowFooter />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
