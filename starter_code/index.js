const Elevator = require('./elevator.js');
const Person = require('./person.js');

let elevator = new Elevator();

var A = new Person ("A", 4, 9);
var B =  new Person ("B", 8, 2);
var C = new Person ("C", 1, 10);


// elevator.start();
elevator.call(A);
elevator.call(C);
elevator.start();
