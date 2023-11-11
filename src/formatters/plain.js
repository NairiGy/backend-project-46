/* eslint-disable no-param-reassign */
import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

export default (tree) => {
  const iter = (currentValue, path) => {
    const lines = Object.entries(currentValue)
      .map(([key, body]) => {
        const value = formatValue(body.value);
        const newValue = formatValue(body.newValue);
        const fullPath = formatValue(`${path}${key}`);
        switch (body.type) {
          case 'unchanged':
            return _.isObject(body.value) ? iter(body.value, `${path}${key}.`) : null;
          case 'changed':
            return `Property ${fullPath} was updated. From ${value} to ${newValue}`;
          case 'deleted':
            return `Property ${fullPath} was removed`;
          case 'new':
            return `Property ${fullPath} was added with value: ${value}`;
          default:
            throw new Error('Unexpected type');
        }
      });

    const noNullLines = lines.filter((line) => line !== null);
    return noNullLines.join('\n');
  };

  return iter(tree, '');
};
