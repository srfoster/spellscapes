"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSpell = void 0;
class Spell {
    constructor() {
        this.components = [];
    }
    tick() {
        this.components = this.components.map((m) => m.tick());
    }
    getName() {
        return "Magic is my Name!";
    }
}
function createSpell() {
    return new Spell();
}
exports.createSpell = createSpell;
