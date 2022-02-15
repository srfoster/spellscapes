export declare class Spell {
    id: number;
    sensor_cores: Array<IntentionGenerator<any>>;
    program_cores: Array<Program>;
    actuator_cores: Array<IntentionGenerator<any>>;
    last_sensor_readings: Array<Intention<any>>;
    constructor(options: any);
    getSensorIntentions(): Intention<any>[];
    runPrograms(): void;
    getActuatorIntentions(): any[];
    gatherIntentionsFor(cores: any): any[];
    getName(): string;
}
export declare class Intention<T> {
    status: IntentionStatus;
    value: T;
    parent: Spell;
    constructor();
    setParent(parent: Spell): void;
    fullfilled(): boolean;
    fullfill(value: T): this;
    deny(): this;
    getStatus(): IntentionStatus;
}
export interface IntentionGenerator<T> {
    getIntentions(): Array<Intention<T>>;
}
export interface Program {
    run(sensors: Array<IntentionGenerator<any>>, sensor_readings: Array<Intention<any>>, actuators: Array<IntentionGenerator<any>>): void;
}
export declare enum IntentionStatus {
    WAITING = "WAITING",
    FULLFILLED = "FULLFILLED",
    DENIED = "DENIED"
}
export declare class SquareRelative<T> extends Intention<T> {
    relX: number;
    relY: number;
    verb: string;
    constructor(verb: string, relX: number, relY: number);
}
export declare function createSpell(options: any): Spell;
