import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const union = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(union);

  const diff = sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return {
        key,
        value: value1,
        type: 'deleted',
      };
    }

    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return {
        key,
        value: value2,
        type: 'added',
      };
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        children: buildTree(value1, value2),
        type: 'nested',
      };
    }

    if (!_.isEqual(value1, value2)) {
      return {
        key,
        value: [value1, value2],
        type: 'changed',
      };
    }

    return {
      key,
      value: value1,
      type: 'unchanged',
    };
  });

  return diff;
};

export default (obj1, obj2) => ({
  children: buildTree(obj1, obj2),
  type: 'root',
});
