import React from 'react';
import logo from './logo.svg';
import './App.css';

import {createSpell} from "spellscapes"

function App() {
  return (
    <div className="App">
       <p>{createSpell()}</p>
    </div>
  );
}

export default App;
