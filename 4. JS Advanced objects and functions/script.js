// Advanced JavaScript objects and functions (looked into js objects and functions in greater detail)
/*
- Everything is an object except primitives
- object oriented programming involves objects interating with one another through methods and properties
- it is used to keep our code structured and organized
- Learnt about prototypes and the prototype chain
- Learnt how to create objects using function constructors
- Learnt how to create objects using object.create
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