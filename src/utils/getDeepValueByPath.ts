/**
 * @see https://stackoverflow.com/a/51049199/8325973
 * This will probably never see the light of day... but here it is anyway.
 * 1. Replace [] bracket syntax with .
 * 2. Split on . character
 * 3. Remove blank strings
 * 4. Find the path (otherwise undefined)
 */
export const getDeepValueByPath = (obj, path) => path
  .replace(/\[|\]\.?/g, '.')
  .split('.')
  .filter((s) => s)
  .reduce((acc, val) => acc && acc[val], obj);

// // <<< There are test cases >>>

// const someObject = {
//   part1: {
//     name: 'Part 1',
//     size: '20',
//     qty: '50',
//   },
//   part2: {
//     name: 'Part 2',
//     size: '15',
//     qty: '60',
//   },
//   part3: [
//     {
//       name: 'Part 3A',
//       size: '10',
//       qty: '20',
//     },
//     // ...
//   ],
//   'pa[rt3': [
//     {
//       name: 'Part 3A',
//       size: '10',
//       qty: '20',
//     },
//     // ...
//   ],
// };

// console.log(deep_value(someObject, 'part1.name')); // Part 1
// console.log(deep_value(someObject, 'part2.qty')); // 60
// console.log(deep_value(someObject, 'part3[0].name')); // Part 3A
// console.log(deep_value(someObject, 'part3[0].....name')); // Part 3A - invalid blank paths removed
// console.log(deep_value(someObject, 'pa[rt3[0].name')); // undefined - name does not support square brackets
