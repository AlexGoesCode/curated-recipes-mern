import { useEffect, useState } from 'react';
import './App.css';
import SideBar from './components/Sidebar';

function App() {
  const [count, setCount] = useState(0);

  const fetchServer = async () => {
    const response = await fetch('http://localhost:5022/api/test');
    const result = await response.json();
    console.log('result :>> ', result);

    useEffect(() => {
      fetchServer();
    }, []);

    return (
      <div>
        <h1 className='text-3xl font-bold underline'>Hello world!</h1>
        <SideBar />
      </div>
    );
  };
}
export default App;
