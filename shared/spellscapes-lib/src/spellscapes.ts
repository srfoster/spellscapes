import * as _ from "lodash";
import {Spell} from "./spells"

export class Spellscape{
  width:number
  height:number

  spells

  constructor(width,height){
    this.width = width
    this.height = height

    this.spells = []
  }

  addSpellAt(spell, row, col){
    console.log("Adding spell at")
    if(!this.spells[row+","+col]) 
       this.spells[row+","+col] = []

    this.spells[row+","+col].push(spell)
  }

  getSpellsAt(row,col):Array<Spell>{
    return this.spells[row+","+col]
  }

  getAllSpells():Array<Spell>{
    return _.flatten(Object.values(this.spells))
  }

  locationOf(spell){
    for(let loc of Object.keys(this.spells)){
      if(this.spells[loc].indexOf(spell) >=0)
        return {row: Number(loc.split(",")[0]),
                col: Number(loc.split(",")[1])}
    }

    return undefined
  }

  previousLocationOf(spell){
    return spell.previousLocation 
  }

  removeSpell(spell){
    for(let loc of Object.keys(this.spells)){
      let i = this.spells[loc].indexOf(spell)
      if(i >=0){
       this.spells[loc].splice(i, 1)
      }
    }

    return undefined
  }

  moveSpellRelative(spell, relRow, relCol){
    let {row, col} = this.locationOf(spell)
    
    this.removeSpell(spell)

    this.addSpellAt(spell, row+relRow, col+relCol)
    spell.previousLocation = {row, col}
  }

  handleSensorIntentions(sis){
    //console.log("TODO, handle sensor intentions", sis)
  }

  handleActuatorIntentions(ais){
    for(let a of ais){
      if(a.constructor.name == "SquareRelative" && a.verb == "move")  {
        this.moveSpellRelative(a.parent, a.relX, a.relY) 
}
    }
  }


  cullDeadSpells(){
   
  }

  tick(){
    //Phase 1: Sensing
    let all = this.getAllSpells()
    let sis = _.flatten(_.shuffle(all).map((s) => s.getSensorIntentions()))
    this.handleSensorIntentions(sis)

    //Phase 2: Thinking
    _.shuffle(all).map((s) => s.runPrograms())

    //Phase 3: Doing 
    let ais = _.flatten(_.shuffle(all).map((s) => s.getActuatorIntentions()))
    this.handleActuatorIntentions(ais)

    //Phase 4: Dying
    this.cullDeadSpells()
  }
}
