import _ from 'lodash';

const symbolMap = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
  nested: ' ',
};

const indent = (depth, offset = 2, spacesCount = 4, replacer = ' ') => replacer.repeat(depth * spacesCount - offset);

const stringify = (value, currentDepth) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const nestedIndent = indent(currentDepth);
  const nestedBracketIndent = indent(currentDepth, 4);
  const lines = Object
    .entries(value)
    .map(([nestedKey, nestedValue]) => `${nestedIndent}  ${nestedKey}: ${stringify(nestedValue, currentDepth + 1)}`);

  return [
    '{',
    ...lines,
    `${nestedBracketIndent}}`,
  ].join('\n');
};

const renderTree = (arr) => {
  const iter = (ast, depth) => {
    const currentIndent = indent(depth);
    const bracketIndent = indent(depth, 4);
    const mapping = {
      nested: (key, children) => `${currentIndent}${symbolMap.nested} ${key}: ${iter(children, depth + 1)}`,
      added: (key, value) => `${currentIndent}${symbolMap.added} ${key}: ${stringify(value, depth + 1)}`,
      deleted: (key, value) => `${currentIndent}${symbolMap.deleted} ${key}: ${stringify(value, depth + 1)}`,
      unchanged: (key, value) => `${currentIndent}${symbolMap.unchanged} ${key}: ${stringify(value, depth + 1)}`,
      changed: (key, value) => [
        mapping.deleted(key, value[0]),
        mapping.added(key, value[1]),
      ].join('\n'),
    };
    const lines = ast.map((node) => mapping[node.type](node.key, node.children ?? node.value, depth));
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(arr, 1);
};

export default renderTree;
