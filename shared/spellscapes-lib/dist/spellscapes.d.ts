import { Spell } from "./spells";
export declare class Spellscape {
    width: number;
    height: number;
    spells: any;
    constructor(width: any, height: any);
    addSpellAt(spell: any, row: any, col: any): void;
    getSpellsAt(row: any, col: any): Array<Spell>;
    getAllSpells(): Array<Spell>;
    locationOf(spell: any): {
        row: number;
        col: number;
    };
    previousLocationOf(spell: any): any;
    removeSpell(spell: any): any;
    moveSpellRelative(spell: any, relRow: any, relCol: any): void;
    handleSensorIntentions(sis: any): void;
    handleActuatorIntentions(ais: any): void;
    cullDeadSpells(): void;
    tick(): void;
}
