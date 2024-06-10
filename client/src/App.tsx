import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import FlowFooter from './components/FlowFooter';

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
    <div className='margin'>
      <Navbar />
      <div>
        {/* Your main content goes here */}
        <div className='p-4'>
          <h1>Welcome to My Website</h1>
          <p className='mt-4'>This is the content of the page.</p>
        </div>
      </div>
      <FlowFooter />
    </div>
  );
}

export default App;
