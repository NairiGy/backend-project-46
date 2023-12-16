import _ from 'lodash';

const stringify = (value) => {
  if (_.isArray(value)) {
    return value.map((item) => stringify(item));
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const mapping = {
  added: (path, value) => `Property ${stringify(path)} was added with value: ${stringify(value)}`,
  deleted: (path) => `Property ${stringify(path)} was removed`,
  unchanged: () => [],
  changed: (path, value) => `Property ${stringify(path)} was updated. From ${stringify(value[0])} to ${stringify(value[1])}`,
  nested: (path, value, children) => {
    const lines = children.map((child) => mapping[child.type](`${path}.${child.key}`, child.value, child.children));
    return _.flatMap(lines).join('\n');
  },
};

const plain = (arr) => {
  const lines = arr.map((node) => mapping[node.type](node.key, node.value, node.children));
  return _.flatMap(lines).join('\n');
};

export default plain;
