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

TODO: API could use some cleanup probably.  Make World class.  Make renderer.  Make simple sugarscape clone.  Formalize simple scripting language for programs?





