/* eslint-disable array-callback-return */
/* eslint-disable default-case */
/* eslint-disable no-case-declarations */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import _ from 'lodash';
import formatters from './formatters/index.js';
import parse from './parsers.js';

const genDiff = (obj1, obj2) => {
  const tree = {};
  Object.entries(obj1)
    .map(([key, value]) => {
      // Если свойство есть в обоих объектах
      if (_.has(obj2, key)) {
        // Если свойство в обоих объектах - объект
        if (_.isObject(value) && _.isObject(obj2[key])) {
          tree[key] = {
            value: genDiff(value, obj2[key]),
            type: 'unchanged',
          };
          return;
        }
        // Если значения совпадают
        if (value === obj2[key]) {
          tree[key] = {
            value,
            type: 'unchanged',
          };
          return;
        }
        // Если значения не совпадают
        tree[key] = {
          value,
          newValue: obj2[key],
          type: 'changed',
        };
        return;
      }
      // Если свойство удалили
      tree[key] = {
        value,
        type: 'deleted',
      };
    });
  Object.entries(obj2)
    .map(([key, value]) => {
      // Если свойство новое
      if (!_.has(obj1, key)) {
        tree[key] = {
          value,
          type: 'new',
        };
      }
    });
  const sorted = Object.keys(tree).sort()
    .reduce(
      (obj, key) => {
        obj[key] = tree[key];
        return obj;
      },
      {},
    );
  return sorted;
};

export default (filepath1, filepath2, format = 'stylish') => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);
  return formatters[format](genDiff(obj1, obj2));
};
