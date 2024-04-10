import React, { useEffect, useRef, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  //const[rates, setRates] = useState({});

  const [fromCurrency, setFromCurrency] = useState('UAH')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(100)

  const ratesRef = useRef({})

  useEffect(() =>{
    fetch('https://openexchangerates.org/api/latest.json?app_id=2c2d1b63ccea4c17b95bf54615fa336b&base=USD')
    .then((res) => res.json())
    .then((json) => {
      ratesRef.current = json.rates
      onChangeToPrice(100)
    })
    .catch((err) => alert('Error'))
  })

  const onChangeFromPrice = (value) =>{
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result);
    setFromPrice(value);
  }

  const onChangeToPrice = (value) =>{
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency] ) * value;
    setFromPrice (result) ;
    setToPrice (value);
  }

  useEffect(()=> {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency])

  useEffect(()=> {
    onChangeToPrice(toPrice);
  }, [toCurrency])


  return (
    <div className="App">
      <Block value={fromPrice} currency= {fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
      <Block value={toPrice} currency={toCurrency} onChangeCurrency= {setToCurrency} onChangeValue={onChangeToPrice} />
    </div>
  );
}

export default App;
