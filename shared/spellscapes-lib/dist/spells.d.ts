declare class Spell {
    components: any;
    constructor();
    tick(): void;
    getName(): string;
}
export declare function createSpell(): Spell;
export {};
