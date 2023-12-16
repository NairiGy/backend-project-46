import * as fs from 'fs';
import path from 'path';
import _ from 'lodash';
import formatters from './formatters/index.js';
import parse from './parsers/index.js';
import buildTree from './treeBuider.js';

const getExtension = (filepath) => _.last(filepath.split('.'));
const getRawData = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const raw = fs.readFileSync(absolutePath, 'utf8');

  return raw;
};

export default (filepath1, filepath2, format = 'stylish') => {
  const rawData1 = getRawData(filepath1);
  const rawData2 = getRawData(filepath2);
  const ext1 = getExtension(filepath1);
  const ext2 = getExtension(filepath2);
  const obj1 = parse(rawData1, ext1);
  const obj2 = parse(rawData2, ext2);

  return formatters[format](buildTree(obj1, obj2));
};
