'use strict'

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
- Learnt about closures
- Learnt about bind, call and apply methods
*/

// Function constructor
// var Person = function(name, age) {
//     this.name = name
//     this.age = age
// }
// Person.prototype.calculateAge = function() {
//     return this.age
// }
// var john = new Person('john', 12)
// console.log(john.calculateAge())

// // Object.create
// var PersonProto = {
//     calculateAge: function(){
//         return this.age
//     }
// }
// var john1 = Object.create(PersonProto, {
//     name: { value: 'john' },
//     age: { value: 23 },
//     show: { value: function() {
//             return this
//         }
//     }
// })
// john1.name = 'mark'
// console.log(john1.show())

// // functions as arguments
// var arr = [12, 13, 14]

// function mutate(arr, calculate) {
//     let arrRes = []
//     for(var i = 0; i < arr.length; i++) {
//         arrRes.push(calculate(arr[i]))
//     }
//     return arrRes
// }

// function calculate(val) {
//     return val + 10
// }

// console.log(mutate(arr, calculate))

// // returning functions
// // function calculate(occ) {
// //     if(occ == 'teacher') {
// //         return function(name) {
// //             console.log('What subject do you teach?', name)
// //         }
// //     }else{
// //         return function(name) {
// //             console.log('you are a', occ)
// //         }
// //     }
// // }
// // var occ = calculate('farmer')
// // occ('mary')

// // IIFES
// // (function(num) {
// //     var score = Math.random() * 10
// //     console.log(num > score)
// // })(5)

// function retirement(retirementAge) {
//     var a = 'years left until retirement'
//     return function(yearOfBirth) {
//         var age = 2021 - yearOfBirth
//         console.log((retirementAge - age) + a)
//     }
// }

// var retirementUS = retirement(65)
// retirementUS(1990)

// function score() {
//     var score = 0
//     return function(val) {
//         score += val
//         console.log(score)
//     }
// }

// score()(3)

// var mark = {
//     name: 'mark',
//     called: function(occ, age) {
//         if(occ == 'teacher') {
//             return occ + ' and age ' + age
//         }
//     }
// }

// var emily = {
//     name: 'emily'
// }

// var apply = mark.called.apply(emily, ['teacher'])
// console.log(apply)

// var johnFig = mark.called.bind(mark, 'teacher')
// console.log(johnFig(23))

// // ?? operator
// // && operator

// var name

// function setName() {
//     var i = 0, name = 'make'

//     return {
//         [name + ++i]: 'peter',
//         [name + ++i]: 'john',
//         [name + ++i]: 'david'
//     }
// }


// Three pillars of OOP
// 1. Encapsulation - placing variables and function in objects, functions have fewer parameters
// 2. Abstraction - setting privacy of variables and functions
// 3. Inheritance - defining methods and borrowing them
// 4. Polymorphism - writing custom methods for some elements and configuring to behave when it meets the conditions

// Benefits of OOP
// 1. Encapsulation - Reduce complexity and increase reusability
// 2. Abstraction- reduce complexity and isolate impact of change
// 3. Inheritance - eliminate redundant code
// 4. Polymorphism - refactor ugly switch/case statements

// const circle = {
//     radius: 1,
//     location: {
//         x: 1,
//         y:1
//     },
//     draw: function() {
//         console.log('draw')
//     }
// }

// function createCircle(radius) {
//     return {
//         radius,
//         draw(){
//             console.log('draw')
//         }
//     }
// }

// // for(let key in circle)
// if('radius' in circle) console.log('1')

// function createCircle(radius) {
//     this.radius = radius

//     let defaultLocation = {
//         x: 0,
//         y: 1
//     }

//     Object.defineProperty(this, 'defaultLocation', {
//         get: function() {
//             return defaultLocation
//         },
//         set: function(value) {
//             defaultLocation = value
//         }
//     })
// }

// let circle1 = new createCircle(10)
// console.log(circle1.defaultLocation)

// var Person = function(name, yob, job)  {
//         this.name = name
//         this.yob = yob
//         this.job = job
// }

// Person.prototype.returnAge = function() {
//     return 2021 - this.yob
// }

// var Person1 = function(name, job, yob, occ) {
//     Person.call(this, name, yob, job)
//     this.occ = occ
// }

// Person1.prototype = Object.create(Person.prototype)

// var john = new Person1('john', 'teacher', 1998, 'maths')

// console.log(john.returnAge())