
class Spell {
  components
  
  constructor(){
    this.components = []
  }

  tick(){
    this.components = this.components.map((m)=>m.tick())
  }

  getName(){
    return "Magic is my Name!"
  }
}

export function createSpell(){
  return new Spell()
}

