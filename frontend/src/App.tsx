import React from 'react';
import {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import {createSpell} from "spellscapes"



function App() {
  let [spell, setSpell] = useState(createSpell())

  return (
    <div className="App">
       <p>{spell.getName()}</p>
    </div>
  );
}

export default App;
