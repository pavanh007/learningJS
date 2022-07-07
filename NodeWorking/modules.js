// console.log(arguments);
// console.log(require('module').wrapper);
const cal1 = require('./test-module-1');
const { adding, division, multiply, subtract} = require('./test-module-2');


const cal = new cal1();
console.log(cal.add(12, 12));

console.log(adding(1, 12, 12));
console.log(division(1, 12, 12));``
console.log(multiply(1, 12, 12));
console.log(subtract(1, 12, 12));

require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();


