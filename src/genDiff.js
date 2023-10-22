import _ from 'lodash';

export default (obj1, obj2) => {
    const diff = [];
    for (const [key1, value1] of Object.entries(obj1)) {
        if (Object.hasOwn(obj2, key1) && obj2[key1] === value1) {
            diff.push([' ', [key1, value1]]);
            delete obj2[key1];
        } else if (Object.hasOwn(obj2, key1)) {
            diff.push(['-', [key1, value1]]);
            diff.push(['+', [key1, obj2[key1]]]);
            delete obj2[key1];
        } else {
            diff.push(['-', [key1, value1]]);
        }
    }
    for (const [key2, value2] of Object.entries(obj2)) {
        diff.push(['+', [key2, value2]]);
    }
    const sorted = _.sortBy(diff, ([, [key, ]]) => key);
    let result = sorted.reduce((acc, [sign, [key, value]]) => {
        acc += `\n ${sign} ${key}: ${value}`;
        return acc;
    }, '{');
    result += '\n}';
    return result;
}