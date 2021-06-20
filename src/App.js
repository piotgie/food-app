import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';
import Recipe from './components/Recipe';
import { v4 as uuidv4 } from 'uuid';
import Alert from './components/Alert';

function App() {

  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState('');

  const APP_ID = "2ee26a15"
  const APP_KEY = "66a2793383e7c9286f7b3c022d6c8997"
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`

  const getData = async () => {
    if (query !== '') {
      const result = await Axios.get(url);
      if(!result.data.more) {
        return setAlert('No food with such name')
      }
      setAlert('');
      setRecipes(result.data.hits)
      setQuery('');
    } else {
      setAlert('Please fill the form')
    }

  }

  const onChange = (e) => {
    setQuery(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  }

  return (
    <div className="App">
      <h1>food searching app</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== '' && <Alert alert={alert}/>}
        <input
          type="text"
          placeholder="search food"
          autoComplete="off"
          onChange={onChange}
          value={query} />
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
        {recipes !== [] && recipes.map(recipe =>
          <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
}

export default App;
