import { useState } from 'react';
import './index.scss';

function App() {
  const[count, setCount] = useState(0);

  const dec = ()=>{
   setCount(count - 1);
  }
  return (
    <div className="App">
      <div>
        <h2>Счетчик:</h2>
        <h1>{count}</h1>
        <button onClick={dec} className="minus">- Минус</button>
        <button onClick={() => setCount(count+1)} className="plus">Плюс +</button>
      </div>
    </div>
  );
}

export default App;
