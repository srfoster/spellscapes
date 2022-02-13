import {createSpell, Program, IntentionGenerator, SenseSquareRelative, EatSquareRelative, IntentionStatus} from "./spells"


test('spells generate sensor intentions that can be fullfilled', () => {
  class TestSensor implements IntentionGenerator<string>{
    getIntentions(){
      return [new SenseSquareRelative<string>(0,0)]
    }  
  }

  let s = createSpell({components: 
                        {sensor_cores: [new TestSensor()]}})

  expect(s.getName()).not.toBe(undefined);

  let sis = s.getSensorIntentions()

  expect(sis.length).toBeGreaterThan(0);

  for(let si of sis){ 
    expect(si.getStatus()).toBe(IntentionStatus.WAITING);
  }

  sis.map((si)=>si.fullfill("There's an apple on that square")) 

  for(let si of sis){ 
    expect(si.getStatus()).toBe(IntentionStatus.FULLFILLED);
  }

})


test('spells can run programs that read sensor data', () => {
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

  class TestActuator implements IntentionGenerator<string>{
    wantToEat:boolean=false
    eat(){this.wantToEat = true}
    getIntentions(){
      if(this.wantToEat)
        return [new EatSquareRelative<string>(0,0)]
      else
        return []
    }  
  }

  let s = createSpell({components: 
                        {  sensor_cores: [new TestSensor()],
                           program_cores: [new TestProgram()], 
                           actuator_cores: [new TestActuator()]}})
  
  let foundFood = (s)=>{
    let ssr = s as SenseSquareRelative<string> 
    if(ssr.relX == 1 && ssr.relY == 0) 
      ssr.fullfill("There's an apple on that square")
    else
      ssr.fullfill("Empty square")
  }

  let sis = s.getSensorIntentions()
  sis.map(foundFood)
  s.runPrograms()
  let ais = s.getActuatorIntentions()

  expect(ais.length).toBe(0)

  //But when the sensor looks at a different square, it finds the apple!

  sis = s.getSensorIntentions()
  sis.map(foundFood)
  s.runPrograms()
  ais = s.getActuatorIntentions()

  expect(ais.length).toBe(1)

})

