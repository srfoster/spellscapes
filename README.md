# Spellscapes

(Started from https://github.com/srfoster/typescript-fullstack-starter)

Revisiting [Sugarscape](https://en.wikipedia.org/wiki/Sugarscape)

What were originally called "agents", we'll call "spells" (so I can reuse this in [CodeSpells](https://codespells.org))

The model is, spells (see `src/spells.ts`) are collections of three kinds of components:

* sensors
* programs
* actuators

The plan is that a "spellscape" will maintain a population of spells, and on every tick:

* Call spell.getSensorIntentions() on every spell.  These intentions are either fulfilled or denied by the world
* Call spell.runPrograms() on every spell, passing along that spell's last sensor intentions (which are carrying readings if they were fulfilled).  Programs will optionally tickle various actuators.
* Calls spell.getActuatorIntentions() and either fulfills or or denies them (i.e. moving the spell to a new square)

See the tests for the basics of constructing a spell with these components, stitching them together, and ticking them.

There's a simple Spellscape implementation `spellscapes.ts` that 

* Implements fairness by randomizing the order that spells get to act on every tick
* "Resolves" conflicts of movement by letting spells occupy the same squares

TODO: Clean up hacked-together pixi js rendering in `frontend`.  Optimize for many sprites.  Make animations less jumpy look better.   Come up with clear visual language for displaying spells with their various components.
  * Look at more of the pixi react example for the appropriate idioms: https://codepen.io/collection/XPpGdb/
  * Consider react-spring for animating agent movement: https://github.com/pmndrs/react-spring

TODO: Make this simple Spellscape resolve sensing intentions, spawn food, have walls, disallow leaving the grid, handle culling

TODO: Do we want worlds (as well as spells) to be modular?  E.g. food spawners?  

TODO: Complete the first world. API could use some cleanup. Make renderer.  Make simple sugarscape clone.  Formalize simple scripting language for programs?





