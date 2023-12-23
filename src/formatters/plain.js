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
  return String(value);
};

const formFullPath = (parts) => stringify(parts.join('.'));

const mapping = {
  root: ({ children }, path, iter) => children.flatMap((node) => iter(node, path, iter)),
  added: ({ value, key }, path) => `Property ${formFullPath([...path, key])} was added with value: ${stringify(value)}`,
  deleted: ({ key }, path) => `Property ${formFullPath([...path, key])} was removed`,
  unchanged: () => [],
  changed: ({ value, key }, path) => `Property ${formFullPath([...path, key])} was updated. From ${stringify(value[0])} to ${stringify(value[1])}`,
  nested: ({ key, children }, path, iter) => children.flatMap((node) => iter(node, [...path, key])),

};

const renderPlain = (ast) => {
  const iter = (node, currentPath) => mapping[node.type](node, currentPath, iter);
  return iter(ast, []).join('\n');
};
export default renderPlain;
