import { test, expect } from '@jest/globals';
import genDiff from '../src/genDiff';
import parse from '../src/parse';

test('genDiff', () => {
    const diff = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;
    const filepath1 = '../file1.json';
    const filepath2 = '../file2.json';
    const data1 = parse(filepath1);
    const data2 = parse(filepath2);
    expect(genDiff(data1, data2).toBe(diff);
});