import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Pokemon from './components/Pokemon';
import Pokedex from './components/Pokedex';


function App() {
  return (
    <Switch>
      <Route path='/' render={(props) => <Pokedex {...props} />} />
      <Route path='/:pokemonId' render={(props) => <Pokemon {...props} />} exact />
    </Switch>
  );
}

export default App;
