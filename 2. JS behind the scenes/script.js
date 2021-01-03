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
    - Scoping and scope chain:
        - Scoping answers the question where can we access a variable
        - Each new function creates a scope, the space in which the variables it defines are accessible
        - Lexical scoping: a function that is within another function gets access to the scope of thw outer function
    - The this keyword:
        - Regular function call: the this keyword points to the global object
        - Method call: the this variable points to the object that is calling the method
        - The this variable is not assigned a value until the function where it is called is defined
*/