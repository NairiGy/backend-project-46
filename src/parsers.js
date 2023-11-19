import * as fs from 'fs';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';

const parsers = {
  json: (raw) => JSON.parse(raw),
  yml: (raw) => yaml.load(raw),
  yaml: (raw) => yaml.load(raw),
};

export default (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  console.log(absolutePath);
  const raw = fs.readFileSync(absolutePath, 'utf8');
  const ext = _.last(filepath.split('.'));
  return parsers[ext](raw);
};
