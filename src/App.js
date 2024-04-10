import React, { useEffect, useState } from 'react';
import './index.scss';
import {Collection} from './components/Collection'

const cats = 
 [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]



function App() {

  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const[searchValue, setSearchValue] = useState ('');
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const category = categoryId ? `category=${categoryId}` : '';

  useEffect (() => {
    setIsLoading(true)
    fetch (`https://65f9ced93909a9a65b196dec.mockapi.io/collection?page=${page}&limit=3&${category}&search=${searchValue}`)
    .then(res =>res.json())
    .then(json => setCollections(json))
    .catch(err => console.warn(err))
    .finally(()=> setIsLoading(false))
  }, [categoryId, page, searchValue])
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj , i) => (
            <li 
            onClick={() => setCategoryId(i)}
            className = {categoryId === i ? 'active' : ''}
            key={i}
            >{obj.name}</li>
          ))}
        </ul>
        <input className="search-input" 
        placeholder="Поиск по названию" 
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}/>
      </div>
      <div className="content">
      {isLoading ? 
      (
      <h2>Loading...</h2>
      ) : (
          collections
            .map((obj) => <Collection key={obj.name } name={obj.name} images={obj.photos} />)
        )}
      </div>
      <ul className="pagination">
       {[...Array(3)].map((_, i) =>(
        <li key={i}
        onClick={()=>setPage(i + 1)}
        className= { page === i + 1 ? 'active' : ''}>
          {i + 1}</li>
       ))}
      </ul>
    </div>
  );
}

export default App;

  );
}

export default App;
