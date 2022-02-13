import {createSpell} from "./spells"

test('spells have names', () => {
  expect(createSpell().getName()).not.toBe(undefined);
});
