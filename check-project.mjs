import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const directory = existsSync('dist/index.html') ? 'dist' : 'docs';
for (const file of readdirSync(directory).filter(name => name.endsWith('.js')).sort()) {
  const result = spawnSync(process.execPath, ['--check', join(directory, file)], {stdio:'inherit'});
  if (result.status !== 0) process.exit(result.status ?? 1);
}
for (const check of ['engine-check.mjs', 'i18n-check.mjs']) {
  const result = spawnSync(process.execPath, [check], {stdio:'inherit'});
  if (result.status !== 0) process.exit(result.status ?? 1);
}
