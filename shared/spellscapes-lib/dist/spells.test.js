"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spells_1 = require("./spells");
test('spells generate sensor intentions that can be fullfilled', () => {
    class TestSensor {
        getIntentions() {
            return [new spells_1.SquareRelative("sense", 0, 0)];
        }
    }
    let s = (0, spells_1.createSpell)({ components: { sensor_cores: [new TestSensor()] } });
    expect(s.getName()).not.toBe(undefined);
    let sis = s.getSensorIntentions();
    expect(sis.length).toBeGreaterThan(0);
    for (let si of sis) {
        expect(si.getStatus()).toBe(spells_1.IntentionStatus.WAITING);
    }
    sis.map((si) => si.fullfill("There's an apple on that square"));
    for (let si of sis) {
        expect(si.getStatus()).toBe(spells_1.IntentionStatus.FULLFILLED);
    }
});
test('spells can run programs that read sensor data', () => {
    class TestSensor {
        constructor() {
            this.xOffset = 0;
        }
        nudge() { this.xOffset++; }
        getIntentions() {
            return [new spells_1.SquareRelative("sense", this.xOffset, 0)];
        }
    }
    class TestProgram {
        run(sensors, sensor_intentions, actuators) {
            for (let si of sensor_intentions) {
                let ssr = si;
                if (ssr.fullfilled() && ssr.value.match(/apple/))
                    actuators[0].eat();
                else
                    sensors[0].nudge();
            }
        }
    }
    class TestActuator {
        constructor() {
            this.wantToEat = false;
        }
        eat() { this.wantToEat = true; }
        getIntentions() {
            if (this.wantToEat)
                return [new spells_1.SquareRelative("eat", 0, 0)];
            else
                return [];
        }
    }
    let s = (0, spells_1.createSpell)({ components: { sensor_cores: [new TestSensor()],
            program_cores: [new TestProgram()],
            actuator_cores: [new TestActuator()] } });
    let foundFood = (s) => {
        let ssr = s;
        if (ssr.relX == 1 && ssr.relY == 0)
            ssr.fullfill("There's an apple on that square");
        else
            ssr.fullfill("Empty square");
    };
    let sis = s.getSensorIntentions();
    sis.map(foundFood);
    s.runPrograms();
    let ais = s.getActuatorIntentions();
    expect(ais.length).toBe(0);
    //But when the sensor looks at a different square, it finds the apple!
    sis = s.getSensorIntentions();
    sis.map(foundFood);
    s.runPrograms();
    ais = s.getActuatorIntentions();
    expect(ais.length).toBe(1);
});
