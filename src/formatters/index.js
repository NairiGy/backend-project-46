import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

export default (formatName) => {
  try {
    return formatters[formatName];
  } catch (e) {
    throw new Error(`Invalid format name ${formatName}`);
  }
};
