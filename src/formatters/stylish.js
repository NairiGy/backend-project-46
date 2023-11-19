/* eslint-disable no-param-reassign */
import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

const formatValue = (value, currentDepth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const nestedIndentSize = currentDepth * spacesCount - 2;
  const nestedIndent = replacer.repeat(nestedIndentSize);
  const nestedBracketIndent = replacer.repeat(nestedIndentSize - 2);
  const lines = Object
    .entries(value)
    .map(([nestedKey, nestedValue]) => `${nestedIndent}  ${nestedKey}: ${formatValue(nestedValue, currentDepth + 1)}`);

  return [
    '{',
    ...lines,
    `${nestedBracketIndent}}`,
  ].join('\n');
};

const stylish = (arr, depth = 1) => {
  const indentSize = depth * spacesCount - 2;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - 2);

  const symbolMap = {
    new: '+',
    deleted: '-',
    unchanged: ' ',
    nested: ' ',
  };

  const makeLine = (key, value, char) => `${currentIndent}${char} ${key}: ${value}`;

  const lineFromType = {
    nested: (key, children) => makeLine(key, stylish(children, depth + 1), symbolMap.nested),
    new: (key, value) => makeLine(key, formatValue(value, depth + 1), symbolMap.new),
    deleted: (key, value) => makeLine(key, formatValue(value, depth + 1), symbolMap.deleted),
    unchanged: (key, value) => makeLine(key, formatValue(value, depth + 1), symbolMap.unchanged),
    changed: (key, value) => [
      lineFromType.deleted(key, value[0]),
      lineFromType.new(key, value[1]),
    ].join('\n'),
  };

  const lines = arr.map((node) => lineFromType[node.type](node.key, node.children ?? node.value));

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

export default stylish;
