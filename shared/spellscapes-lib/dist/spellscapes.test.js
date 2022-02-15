"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spellscapes_1 = require("./spellscapes");
const example_spells_1 = require("./example-spells");
test('spellscapes can add, remove, and move spells', () => {
    let spellscape = new spellscapes_1.Spellscape(10, 10);
    let spell = (0, example_spells_1.createBlindWanderingGrazer)();
    spellscape.addSpellAt(spell, 0, 0);
    let spells_on_start = spellscape.getSpellsAt(0, 0);
    expect(spells_on_start.length).toBe(1);
    spellscape.moveSpellRelative(spell, 1, 0);
    spells_on_start = spellscape.getSpellsAt(0, 0);
    expect(spells_on_start.length).toBe(0);
    let spells_below_start = spellscape.getSpellsAt(1, 0);
    expect(spells_below_start.length).toBe(1);
});
test('spellscapes can tick spells', () => {
    let spellscape = new spellscapes_1.Spellscape(10, 10);
    let spell = (0, example_spells_1.createBlindWanderingGrazer)();
    spellscape.addSpellAt(spell, 0, 0);
    let spells_on_start = spellscape.getSpellsAt(0, 0);
    expect(spells_on_start.length).toBe(1);
    spellscape.tick();
    spells_on_start = spellscape.getSpellsAt(0, 0);
    expect(spells_on_start.length).toBe(0);
});
test('spellscapes can tick whole populations', () => {
    let spellscape = new spellscapes_1.Spellscape(10, 10);
    for (let i = 0; i < 10; i++) {
        spellscape.addSpellAt((0, example_spells_1.createBlindWanderingGrazer)(), 0, 0);
    }
    let spells_on_start = spellscape.getSpellsAt(0, 0);
    expect(spells_on_start.length).toBe(10);
    spellscape.tick();
    spellscape.tick();
    spellscape.tick();
    spellscape.tick();
    spells_on_start = spellscape.getSpellsAt(0, 0);
    expect(spells_on_start.length).toBeLessThan(10); //SOME of them should have moved by now unless we got very unlucky
});
