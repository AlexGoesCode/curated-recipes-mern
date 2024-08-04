import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import FlowFooter from './components/Footer';
import DesktopImage from './assets/dim-spices.png';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/Routes';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <AuthProvider>
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
      </AuthProvider>
    </Router>
  );
}

export default App;
