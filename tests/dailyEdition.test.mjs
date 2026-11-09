import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';

// Run the pure selector without Next.js or network access.
const api = {};
new Function('exports', ts.transpileModule(fs.readFileSync('lib/dailyEdition.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText)(api);
const event = (year, text) => ({ year, text });

test('a named turning point outranks incidental war coverage and routine trivia', () => {
  const lead = event('1962', 'The Cuban Missile Crisis ends.');
  const result = api.selectStories([
    event('1900', 'A local club holds its annual meeting.'),
    event('1918', 'World War I: a military unit changes its commander.'),
    lead,
  ]);
  assert.equal(result[0].text, lead.text);
  assert.equal(result.length, 2);
});
test('the edition is capped at three unique events', () => {
  const events = Array.from({ length: 8 }, (_, index) => event(String(1800 + index), `A constitution is adopted in region ${index}.`));
  const result = api.selectStories([...events, ...events]);
  assert.equal(result.length, 3);
  assert.equal(new Set(result.map(item => item.text)).size, 3);
});
test('quiet dates are not padded with unrelated events', () => {
  assert.deepEqual(api.selectStories([event('2000', 'A television show airs its final episode.')]), []);
  assert.deepEqual(api.selectStories([]), []);
});
test('cultural milestones are not excluded by a politics-only filter', () => {
  const result = api.selectStories([event('1886', 'The Statue of Liberty is dedicated.')]);
  assert.equal(result.length, 1);
  assert.equal(result[0].topic, 'Culture & connection');
});

