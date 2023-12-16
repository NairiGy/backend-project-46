import parseYml from './yml.js';
import parseJson from './json.js';

const parsers = {
  json: (raw) => parseJson(raw),
  yml: (raw) => parseYml(raw),
  yaml: (raw) => parseYml(raw),
};

export default (raw, type) => parsers[type](raw);
