import * as _ from "lodash";

export class Spell {
  sensor_cores:Array<IntentionGenerator<any>>
  program_cores:Array<Program>
  actuator_cores:Array<IntentionGenerator<any>>

  last_sensor_readings:Array<Intention<any>>
  
  constructor(options){
    this.sensor_cores = options.components.sensor_cores || []
    this.program_cores = options.components.program_cores || []
    this.actuator_cores = options.components.actuator_cores || []
  }

  getSensorIntentions(){
    this.last_sensor_readings =  this.gatherIntentionsFor(this.sensor_cores)

    return this.last_sensor_readings
  }

  runPrograms(){
    _.map(this.program_cores,(p)=>p.run(this.sensor_cores, this.last_sensor_readings, this.actuator_cores)) 
  }

  getActuatorIntentions(){
    return this.gatherIntentionsFor(this.actuator_cores)
  }

  gatherIntentionsFor(cores) {
    return _.flatten(_.map(cores, (m)=>m.getIntentions().map((i)=>{
     i.setParent(this)
     return i 
   })))
  }

  getName(){
    return "Magic is my Name!"
  }
}

export class Intention<T>{
  status:IntentionStatus
  value:T
  parent:Spell
  constructor(){
    this.status = IntentionStatus.WAITING
  }
  setParent(parent:Spell){
    this.parent = parent
  }
  fullfilled(){
    return this.status == IntentionStatus.FULLFILLED
  }
  fullfill(value:T){
    this.value = value 
    this.status = IntentionStatus.FULLFILLED
    return this
  }
  deny(){
    this.status = IntentionStatus.DENIED
    return this
  }
  getStatus(){
    return this.status
  }
}

export interface IntentionGenerator<T>{
  getIntentions(): Array<Intention<T>>
}

export interface Program{
  run(sensors: Array<IntentionGenerator<any>>, sensor_readings:Array<Intention<any>>, actuators:Array<IntentionGenerator<any>>): void
}

export enum IntentionStatus{
  WAITING = "WAITING", 
  FULLFILLED = "FULLFILLED",
  DENIED = "DENIED"
}

export class SquareRelative<T> extends Intention<T>{
  relX:number
  relY:number
  verb:string
  constructor(verb:string, relX:number,relY:number){
    super()
    this.relX=relX
    this.relY=relY
    this.verb=verb
  }
}

export function createSpell(options){
  return new Spell(options)
}

