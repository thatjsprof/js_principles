// Introduction to js
/*
- JavaScript is a lightweight, cross-platform and object oriented computer programming language
- It is used both on the client side and server side
- It brings dynamic effects and interactivity
- There are a lot of js frameworks like vue, react, angular, jquery e.t.c 
*/



// Variables
/*
- Variables can be declared using the var, let and const keywords
- Primitive js types include:
    1. Number: Floats or ints
    2. Strings
    3. Boolean
    4. Undefined: declared but no value
    5. null: non-existent

- JavaScript has dynamic data typing: data types are automatically assigned to variables
- Don't use reserved keywords as variable names also don't start naming with numbers
- You can use camelCase notation to name variables

Examples:
    var teacher
    console.log(teacher) returns undefined

    teacher = 'james'
    console.log(teacher) returns james
*/



// Variable mutation and type coercion
/*
E.g
    var name = 'james'
    var age = 23
    console.log(name + ' ' + age) converts age to string

- Variable mutation just means that variable values can be changed so far they are not constants
*/



// Basic Operators
/*
- Math operators include the addition, subtraction, division and multiplication operators
- Logical operators are used for comparison
- Typeof operator returns the type of variable e.g typeof variable_name
- Operator precedence check developer.mozilla.org then type operator precedence
*/



// Conditionals
/*
- If/else statements
- The ternary operator ?
- Switch statements
*/



// Truthy, falsy values and equality operators
/*
- Falsy values: null, undefined, '', 0
- Truthy values: not falsy values
*/



// Functions
/*
- functions take arguments and are called
- function statements and expressions. expressions are assigned to a variable
*/



// Arrays
/*
- create arrays using [] or new Array()
- push, pop, unshift e.t.c are examples of array methods
*/



// Objects and properties
/*
- Objects are created using the {} brackets
*/



// Objects and methods
/*
- You can create methods in objects using the function keyword and access values in the object using the this keyword
*/



// Loops and iterations
/*
- for, while and do while loops
*/



// How JavaScript works behind the scenes
/*
- learnt about the javascript engine
- learnt about execution contexts and execution stacks:
    - Global execution context are seen as global objects and incude code that is not inside a function
    - Each time we call a function it gets its own execution context
    - Execution stacks are formed based on the functions that are being executed
    - As the functions are executed the contexts are popped off the stack
    - In the creation phase we have the creation of the variable object, then the creation of the scope chain and finally determining the context of the this variable
    - Creating the variable object:
        - The argument object is created which contains all the arguments that were passed into the function
        - The code is scanned for function declarations for each function a property is created in the variable object pointing to the function
        - The code is scanned also for variable declarations. This principle is referred to as hoisting which means that the variables and funcrions are declared before the code is run. variables are set to undefined
    - Scoping and scope chain
        - Scoping answers the question where can we access a variable
        - Each new function creates a scope, the space in which the variables it defines are accessible
        - Lexical scoping: a function that is within another function gets access to the scope of thw outer function
*/