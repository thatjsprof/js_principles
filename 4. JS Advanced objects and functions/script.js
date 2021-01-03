// Advanced JavaScript objects and functions (looked into js objects and functions in greater detail)
/*
- Everything is an object except primitives
- object oriented programming involves objects interating with one another through methods and properties
- it is used to keep our code structured and organized
- Learnt about prototypes and the prototype chain
- Learnt how to create objects using function constructors
- Learnt how to create objects using object.create
- learnt more about objects and primitives
- Learnt how to pass functions as argumants
- Learnt how to return functions from functions
- Learnt about immediately invoked functions
*/

// Function constructor
var Person = function(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.calculateAge = function() {
    return this.age
}
var john = new Person('john', 12)
console.log(john.calculateAge())

// Object.create
var PersonProto = {
    calculateAge: function(){
        return this.age
    }
}
var john1 = Object.create(PersonProto, {
    name: { value: 'john' },
    age: { value: 23 },
    show: { value: function() {
            return this
        }
    }
})
john1.name = 'mark'
console.log(john1.show())

// functions as arguments
var arr = [12, 13, 14]

function mutate(arr, calculate) {
    let arrRes = []
    for(var i = 0; i < arr.length; i++) {
        arrRes.push(calculate(arr[i]))
    }
    return arrRes
}

function calculate(val) {
    return val + 10
}

console.log(mutate(arr, calculate))

// returning functions
// function calculate(occ) {
//     if(occ == 'teacher') {
//         return function(name) {
//             console.log('What subject do you teach?', name)
//         }
//     }else{
//         return function(name) {
//             console.log('you are a', occ)
//         }
//     }
// }
// var occ = calculate('farmer')
// occ('mary')

// IIFES
// (function(num) {
//     var score = Math.random() * 10
//     console.log(num > score)
// })(5)