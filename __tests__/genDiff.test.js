import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff';
import parse from '../src/parse';
import path from 'path';
import * as fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('genDiff', () => {
    const diffFile = 'diff';
    const file1 = 'file1.json';
    const file2 = 'file2.json';
    const diffFilePath = getFixturePath(diffFile);
    const file1Path = getFixturePath(file1);
    const file2Path = getFixturePath(file2);
    const diff = fs.readFileSync(diffFilePath, 'utf-8');
    const data1 = parse(file1Path);
    const data2 = parse(file2Path);
    expect(genDiff(data1, data2)).toBe(diff);
});