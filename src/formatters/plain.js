/* eslint-disable no-param-reassign */
import _ from 'lodash';

const formatValue = (value) => {
  if (_.isArray(value)) {
    return value.map((item) => formatValue(item));
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const lineFromType = {
  new: (path, value) => `Property ${path} was added with value: ${value}`,
  deleted: (path) => `Property ${path} was removed`,
  unchanged: () => null,
  changed: (path, value) => `Property ${path} was updated. From ${value[0]} to ${value[1]}`,
};

const plain = (arr, path = '') => {
  const lines = arr.map((node) => {
    if (node.type === 'nested') {
      return plain(node.children, `${path}${node.key}.`);
    }
    const value = formatValue(node.value);
    const fullPath = formatValue(`${path}${node.key}`);
    return lineFromType[node.type](fullPath, value);
  });
  const noNullLines = lines.filter((line) => line !== null);
  return noNullLines.join('\n');
};

export default plain;
