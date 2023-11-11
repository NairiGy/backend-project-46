// import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import * as fs from 'fs';
import genDiff from '../src/genDiff.js';
import parse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  ['stylish', 'json'],
  ['stylish', 'yaml'],
  ['stylish', 'yml'],
  ['plain', 'json'],
  ['plain', 'yaml'],
  ['plain', 'yml'],
  ['json', 'json'],
  ['json', 'yaml'],
  ['json', 'yml'],
])('.gen %p diff for %p', (format, ext) => {
  const diffFile = `diff ${format}`;
  const file1 = `file1.${ext}`;
  const file2 = `file2.${ext}`;
  const diffFilePath = getFixturePath(diffFile);
  const file1Path = getFixturePath(file1);
  const file2Path = getFixturePath(file2);
  const diff = fs.readFileSync(diffFilePath, 'utf-8');
  const data1 = parse(file1Path);
  const data2 = parse(file2Path);
  expect(genDiff(data1, data2, format)).toBe(diff);
});
