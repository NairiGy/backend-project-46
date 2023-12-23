import _ from 'lodash';

const indent = (depth, offset = 2, spacesCount = 4, replacer = ' ') => replacer.repeat(depth * spacesCount - offset);

const stringify = (value, currentDepth, unchanged) => {
  if (!_.isObject(value)) {
    return String(value);
  }

  const lines = Object
    .entries(value)
    .map(([k, v]) => unchanged({ key: k, value: v }, currentDepth));

  return [
    '{',
    ...lines,
    `${indent(currentDepth, 4)}}`,
  ].join('\n');
};

const mapping = {
  root: ({ children }, depth, iter) => [
    '{',
    children.flatMap((node) => iter(node, depth + 1, iter)).join('\n'),
    '}'],
  nested: ({ key, children }, depth, iter) => [
    `${indent(depth)}  ${key}: {`,
    `${children.flatMap((node) => iter(node, depth + 1, iter)).join('\n')}`,
    `${indent(depth, 0)}}`],
  added: ({ key, value }, depth) => `${indent(depth)}+ ${key}: ${stringify(value, depth + 1, mapping.unchanged)}`,
  deleted: ({ key, value }, depth) => `${indent(depth)}- ${key}: ${stringify(value, depth + 1, mapping.unchanged)}`,
  unchanged: ({ key, value }, depth) => `${indent(depth)}  ${key}: ${stringify(value, depth + 1, mapping.unchanged)}`,
  changed: ({ key, value }, depth) => [
    mapping.deleted({ key, value: value[0] }, depth),
    mapping.added({ key, value: value[1] }, depth),
  ].join('\n'),
};
const renderStylish = (ast) => {
  const iter = (node, currentDepth) => mapping[node.type](node, currentDepth, iter);
  return iter(ast, 0).join('\n');
};
export default renderStylish;
