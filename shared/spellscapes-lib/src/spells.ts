import * as _ from "lodash";

class Spell {
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
    return _.flatten(_.map(cores, (m)=>m.getIntentions()))
  }

  getName(){
    return "Magic is my Name!"
  }
}

export class Intention<T>{
  status:IntentionStatus
  value:T
  constructor(){
    this.status = IntentionStatus.WAITING
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



export class SenseSquareRelative<T> extends Intention<T>{
  relX:number
  relY:number
  constructor(relX:number,relY:number){
    super()
    this.relX=relX
    this.relY=relY
  }
}

export class EatSquareRelative<T> extends Intention<T>{
  relX:number
  relY:number
  constructor(relX:number,relY:number){
    super()
    this.relX=relX
    this.relY=relY
  }
}



export function createSpell(options){
  return new Spell(options)
}

