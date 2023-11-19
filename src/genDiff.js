/* eslint-disable array-callback-return */
/* eslint-disable default-case */
/* eslint-disable no-case-declarations */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import _ from 'lodash';
import formatters from './formatters/index.js';
import parse from './parsers.js';

const genDiff = (obj1, obj2) => {
  const tree = Object.entries(obj1)
    .map(([key, value]) => {
      // Если свойство есть в обоих объектах
      if (_.has(obj2, key)) {
        // Если свойство в обоих объектах - объект
        if (_.isObject(value) && _.isObject(obj2[key])) {
          return {
            key,
            children: genDiff(value, obj2[key]),
            type: 'nested',
          };
        }
        // Если значения совпадают
        if (value === obj2[key]) {
          return {
            key,
            value,
            type: 'unchanged',
          };
        }
        // Если значения не совпадают
        return {
          key,
          value: [value, obj2[key]],
          type: 'changed',
        };
      }
      // Если свойство удалили
      return {
        key,
        value,
        type: 'deleted',
      };
    });
  const newItems = Object.entries(obj2)
    .map(([key, value]) => {
      // Если свойство новое
      if (!_.has(obj1, key)) {
        return {
          key,
          value,
          type: 'new',
        };
      }
      return null;
    })
    .filter((item) => !_.isNull(item));
  const all = tree.concat(newItems);
  const sorted = _.sortBy(all, (item) => item.key);
  return sorted;
};

export default (filepath1, filepath2, format = 'stylish') => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);
  return formatters[format](genDiff(obj1, obj2));
};
