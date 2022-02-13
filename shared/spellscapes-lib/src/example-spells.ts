import {Spell, SquareRelative, IntentionGenerator, Program} from "./spells"

/*
class TestSensor implements IntentionGenerator<string>{
    xOffset = 0 
    nudge(){this.xOffset++}
    getIntentions(){
      return [new SenseSquareRelative<string>(this.xOffset,0)]
    }  
}

class TestProgram implements Program{
    run(sensors, sensor_intentions, actuators){ //Should it just take sensors+actuators and query the sensors for their most recent sensor readings?
      for(let si of sensor_intentions) {
        let ssr = (si as SenseSquareRelative<any>)
        if(ssr.fullfilled() && ssr.value.match(/apple/))
          actuators[0].eat()
        else
          sensors[0].nudge()
      }
    }  
  }
*/

class WanderRandomly implements Program{
  run(sensors, readings, actuators){
    let r = Math.floor(Math.random()*4)
    let a = (actuators[0] as FourWayMovementActuator)
    if(r == 0) 
      a.north();

    if(r == 1) 
      a.south();

    if(r == 2) 
      a.east();

    if(r == 3) 
      a.west();
  }
}

class FourWayMovementActuator implements IntentionGenerator<string>{
    goNorth = false
    goSouth = false
    goEast = false
    goWest = false

    north(){
     this.goNorth = true
     this.goSouth = false
     this.goEast = false
     this.goWest = false
    }
    south(){
     this.goNorth = false
     this.goSouth = true
     this.goEast = false
     this.goWest = false
    }
    east(){
     this.goNorth = false
     this.goSouth = false
     this.goEast = true
     this.goWest = false
    }
    west(){
     this.goNorth = false
     this.goSouth = false
     this.goEast = false
     this.goWest = true
    }
    getIntentions(){
      if(this.goNorth)
        return [new SquareRelative<string>("move",-1,0)]
      if(this.goSouth)
        return [new SquareRelative<string>("move",1,0)]
      if(this.goEast)
        return [new SquareRelative<string>("move",0,-1)]
      if(this.goWest)
        return [new SquareRelative<string>("move",0,1)]
    }  
  }


export function createBlindWanderingGrazer(){
  return new Spell({components:
    {sensor_cores: [],
     program_cores: [new WanderRandomly()],
     actuator_cores: [new FourWayMovementActuator()]}
    })
}
