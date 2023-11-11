/* eslint-disable no-param-reassign */
import _ from 'lodash';

const formLine = (ident, key, value, changeSymbol) => `${ident}${changeSymbol} ${key}: ${value}`;

const typeToLine = {
  unchanged: (ident, key, value) => formLine(ident, key, value, ' '),
  changed: (ident, key, value, newValue) => [
    formLine(ident, key, value, '-'),
    formLine(ident, key, newValue, '+'),
  ].join('\n'),
  deleted: (ident, key, value) => formLine(ident, key, value, '-'),
  new: (ident, key, value) => formLine(ident, key, value, '+'),
};

export default (tree) => {
  const iter = (currentValue, depth, replacer = ' ', spacesCount = 4) => {
    const indentSize = depth * spacesCount - 2;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - 2);
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const lines = Object.entries(currentValue)
      .map((key, body) => {
        if (body.newValue) {
          const { type, value, newValue } = body;
          console.log(type);
          const valueIter = iter(value, depth + 1);
          if (newValue) {
            const newValueIter = iter(newValue, depth + 1);
            return typeToLine[type](currentIndent, key, valueIter, newValueIter);
          }
          return typeToLine[type](currentIndent, key, valueIter);
        }
        const notAnObject = body;
        return typeToLine.unchanged(currentIndent, key, iter(notAnObject, depth + 1));
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(tree, 1);
};
