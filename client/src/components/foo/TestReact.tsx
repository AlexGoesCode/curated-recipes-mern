import { useEffect, useState } from 'react';

function TestReact() {
  console.log('%c component run', 'color:green');
  //   let number = 0;
  const [number, setNumber] = useState(0);
  const [word, setWord] = useState('Hello');
  const increaseCount = () => {
    console.log('click');
    setNumber(number + 1);
    console.log('number :>> ', number);
  };

  const sayHi = () => {
    console.log('HI THERE');
  };

  const changeWord = () => {
    if (word === 'Hello') {
      setWord('World');
    } else {
      setWord('Hello');
    }
  };
  useEffect(() => {
    console.log('%c useEffect RUN', 'color:red');
    sayHi();
  }, [word]);

  return (
    <div
      style={{
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
      }}
    >
      {(() => {
        console.log('%c HTML PART run', 'color:orange');
        return null;
      })()}
      <h1>Testing useEffect and useState</h1>
      <h2>Counter</h2>
      <h3>number:{number}</h3>
      <button onClick={increaseCount}>+</button>
      <h3>word:{word}</h3>

      <button onClick={changeWord}>change Word</button>
    </div>
  );
}

export default TestReact;
