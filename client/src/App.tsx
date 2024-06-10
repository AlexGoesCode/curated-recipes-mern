import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/Navbar';

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
    <div>
      <NavBar />
    </div>
  );
}

export default App;
