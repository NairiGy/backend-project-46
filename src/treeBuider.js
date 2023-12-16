import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const union = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  const items = union.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    // Если свойство есть в обоих объектах
    if (_.has(obj1, key) && _.has(obj2, key)) {
      // Если свойство в обоих объектах - объект
      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        return {
          key,
          children: buildTree(value1, value2),
          type: 'nested',
        };
      }
      // Если значения совпадают
      if (value1 === value2) {
        return {
          key,
          value: value1,
          type: 'unchanged',
        };
      }
      // Если значения не совпадают
      return {
        key,
        value: [value1, value2],
        type: 'changed',
      };
    }
    // Если свойство удалили
    if (_.has(obj1, key)) {
      return {
        key,
        value: value1,
        type: 'deleted',
      };
    }
    // Если свойство новое
    return {
      key,
      value: value2,
      type: 'added',
    };
  });

  return items;
};

export default buildTree;
