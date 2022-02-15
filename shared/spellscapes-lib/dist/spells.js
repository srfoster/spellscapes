"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSpell = exports.SquareRelative = exports.IntentionStatus = exports.Intention = exports.Spell = void 0;
const _ = require("lodash");
let nextId = 0;
class Spell {
    constructor(options) {
        this.id = nextId++;
        this.sensor_cores = options.components.sensor_cores || [];
        this.program_cores = options.components.program_cores || [];
        this.actuator_cores = options.components.actuator_cores || [];
    }
    getSensorIntentions() {
        this.last_sensor_readings = this.gatherIntentionsFor(this.sensor_cores);
        return this.last_sensor_readings;
    }
    runPrograms() {
        _.map(this.program_cores, (p) => p.run(this.sensor_cores, this.last_sensor_readings, this.actuator_cores));
    }
    getActuatorIntentions() {
        return this.gatherIntentionsFor(this.actuator_cores);
    }
    gatherIntentionsFor(cores) {
        return _.flatten(_.map(cores, (m) => m.getIntentions().map((i) => {
            i.setParent(this);
            return i;
        })));
    }
    getName() {
        return "Magic is my Name!";
    }
}
exports.Spell = Spell;
class Intention {
    constructor() {
        this.status = IntentionStatus.WAITING;
    }
    setParent(parent) {
        this.parent = parent;
    }
    fullfilled() {
        return this.status == IntentionStatus.FULLFILLED;
    }
    fullfill(value) {
        this.value = value;
        this.status = IntentionStatus.FULLFILLED;
        return this;
    }
    deny() {
        this.status = IntentionStatus.DENIED;
        return this;
    }
    getStatus() {
        return this.status;
    }
}
exports.Intention = Intention;
var IntentionStatus;
(function (IntentionStatus) {
    IntentionStatus["WAITING"] = "WAITING";
    IntentionStatus["FULLFILLED"] = "FULLFILLED";
    IntentionStatus["DENIED"] = "DENIED";
})(IntentionStatus = exports.IntentionStatus || (exports.IntentionStatus = {}));
class SquareRelative extends Intention {
    constructor(verb, relX, relY) {
        super();
        this.relX = relX;
        this.relY = relY;
        this.verb = verb;
    }
}
exports.SquareRelative = SquareRelative;
function createSpell(options) {
    return new Spell(options);
}
exports.createSpell = createSpell;
