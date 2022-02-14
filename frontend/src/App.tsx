import React from 'react';
import {useState, useReducer, useRef} from 'react';
import logo from './logo.svg';
import './App.css';

import { Stage, Sprite, useTick } from '@inlet/react-pixi'
import { BLEND_MODES } from '@pixi/constants'



import {Spellscape, createBlindWanderingGrazer} from "spellscapes"


const Bunny = (props:any) => {
  // states
  const [fromX, setFromX] = useState(props.fromX );
  const [toX, setToX] = useState(props.toX);
  const [fromY, setFromY] = useState(props.fromY );
  const [toY, setToY] = useState(props.toY);

  const [speed, setSpeed] = useState(props.speed);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [i, setI] = useState(0);
  const [rotation, setRotation] = useState(0);

  // custom ticker
  useTick(delta => {
    setI(i=> i+ 0.05 * delta)

   // setX(Math.sin(i) * 10 * speed);
   // setY(Math.sin(i/1.5) * 10 * speed);
    setFromX((x:any)=>toX > x ? x+1 : x-1)
    setFromY((y:any)=>toY > y ? y+1 : y-1)
    setRotation(-10 + Math.sin(i/10 + Math.PI * 2) * 10 * speed);
  });

  return (
    <Sprite
      blendMode={BLEND_MODES.ADD}
      image="./small-magic-symbol.jpg"
      anchor={0.5}
      x={fromX+x}
      y={fromY+y}
      height={50}
      width={50}
      rotation={rotation}
    />
  );
};

function App() {
  let [tickled, setTickle] = useState(0)
  let [spellscape, setSpellscape] = useState(new Spellscape(10,10))

  console.log(spellscape.getAllSpells())

  return (
    <div className="App">
       <div>
       <button onClick={(e)=> { 
          setTickle(Math.random())
          spellscape.tick()
       }}>Tick</button>
       <button onClick={(e)=>{
            setTickle(Math.random())
            spellscape.addSpellAt(createBlindWanderingGrazer(), 5, 5)
       }}>Add Spell</button>
       </div>
       <Stage>
         {spellscape.getAllSpells().map((s,i)=>{
           let from = spellscape.previousLocationOf(s)
           let to = spellscape.locationOf(s)
           if(!from) from = to
           //console.log(from,to,s.id)
           return <Bunny key={Math.random()} speed={Math.random()} fromX={from.col*25} fromY={from.row*25} toX={to.col*25} toY={to.row*25} /> 
         })}
       </Stage>
    </div>
  );
}

export default App;
