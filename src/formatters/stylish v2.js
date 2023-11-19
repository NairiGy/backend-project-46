/* eslint-disable no-param-reassign */
import _ from 'lodash';

export default (tree) => {
  const iter = (currentValue, depth, replacer = ' ', spacesCount = 4) => {
    const indentSize = depth * spacesCount - 2;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - 2);
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const lines = Object.entries(currentValue)
      .map(([key, body]) => {
        switch (body.type) {
          case 'unchanged':
            return `${currentIndent}  ${key}: ${iter(body.value, depth + 1)}`;
          case 'changed':
            return [
              `${currentIndent}- ${key}: ${iter(body.value, depth + 1)}`,
              `${currentIndent}+ ${key}: ${iter(body.newValue, depth + 1)}`,
            ].join('\n');
          case 'deleted':
            return `${currentIndent}- ${key}: ${iter(body.value, depth + 1)}`;
          case 'new':
            return `${currentIndent}+ ${key}: ${iter(body.value, depth + 1)}`;
          default:
            return `${currentIndent}  ${key}: ${iter(body, depth + 1)}`;
        }
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(tree, 1);
};
