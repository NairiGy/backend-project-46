import * as fs from 'fs';
import path from 'path';
import _ from 'lodash';

const parseFromJSON = (raw) => JSON.parse(raw);

export default (filepath) => {
    const absolutePath = path.resolve(process.cwd(), filepath);
    const raw = fs.readFileSync(absolutePath, 'utf8');
    const ext = _.last(filepath.split('.'));
    return parseFromJSON(raw);
}