import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import FlowFooter from './components/Footer';
import DesktopImage from './assets/spices2.png';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/Routes';

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
    <Router>
      <div
        className='relative h-screen bg-cover bg-center flex flex-col min-h-screen saturate-100'
        style={{ backgroundImage: `url(${DesktopImage})` }}
      >
        <div className='fixed inset-0 bg-black bg-opacity-50'></div>
        <Navbar />
        <div className='flex-grow'>
          Your main content goes here
          <div>
            {/* <h1>Welcome to My Website</h1> */}
            <Routes />
            {/* <p className='mt-4'>This is the content of the page.</p> */}
          </div>
        </div>
        <FlowFooter />
      </div>
    </Router>
  );
}

export default App;
