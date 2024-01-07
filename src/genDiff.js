import * as fs from 'fs';
import path from 'path';
import formatters from './formatters/index.js';
import parse from './parsers.js';
import buildTree from './treeBuider.js';

const extractExtname = (filepath) => path.extname(filepath).slice(1);
const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getData = (fullPath) => fs.readFileSync(fullPath, 'utf8');

const format = (formatName, internalTree) => formatters(formatName)(internalTree);

export default (filepath1, filepath2, formatName = 'stylish') => {
  const fullPath1 = buildFullPath(filepath1);
  const fullPath2 = buildFullPath(filepath2);
  const data1 = getData(fullPath1);
  const data2 = getData(fullPath2);
  const ext1 = extractExtname(filepath1);
  const ext2 = extractExtname(filepath2);
  const obj1 = parse(data1, ext1);
  const obj2 = parse(data2, ext2);
  const internalTree = buildTree(obj1, obj2);

  return format(formatName, internalTree);
};
