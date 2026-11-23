import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

const directory = existsSync('dist/index.html') ? 'dist' : 'docs';
const { MESSAGES } = await import(pathToFileURL(resolve(directory, 'i18n.js')));
const { PROLOGUE } = await import(pathToFileURL(resolve(directory, 'story-ui.js')));
const japanese = /[\u3040-\u30ff\u3400-\u9fff]/;
const html = readFileSync(resolve(directory, 'index.html'), 'utf8');
for (const match of html.matchAll(/data-i18n(?:-html|-aria|-title)?="([^"]+)"/g)) {
  assert.ok(MESSAGES[match[1]], `Missing UI translation: ${match[1]}`);
}
for (const [key, pair] of Object.entries(MESSAGES)) {
  assert.equal(pair.length, 2, `Incomplete language pair: ${key}`);
  assert.ok(pair.every(text => typeof text === 'string' && text.trim()), `Empty UI translation: ${key}`);
  assert.ok(!japanese.test(pair[1]), `Japanese fallback in English UI: ${key}`);
}
for (const [index, scene] of PROLOGUE.entries()) {
  for (const key of ['label','time','title','body','note','aria']) {
    assert.ok(scene.ja[key] && scene.en[key], `Incomplete prologue ${index}: ${key}`);
    assert.ok(!japanese.test(scene.en[key]), `Japanese fallback in English prologue ${index}: ${key}`);
  }
}
// GitHub Pages serves under a project subpath. Every shipped import must remain
// relative and resolve in the actual export, including newly added story files.
for (const file of readdirSync(directory).filter(name => /\.(js|html)$/.test(name))) {
  const content = readFileSync(resolve(directory, file), 'utf8');
  const references = [...content.matchAll(/(?:from\s+|(?:src|href)=)["'](\.\.?\/[^"']+)["']/g)];
  for (const [, reference] of references) assert.ok(existsSync(resolve(dirname(resolve(directory,file)), reference)), `${file}: missing asset ${reference}`);
}
console.log('UI verified: complete Japanese/English strings, translated prologue, and relative deployment assets.');
