var john = {
    name: 'John',
    age: 12,
    mass: 20,
    height: 16,
    BMI: function calculateBMI() {
        return this.BMIVal = this.mass / this.height * this.height
    }
}

var mark = {
    name: 'Mark',
    age: 12,
    mass: 40,
    height: 6,
    BMI: function calculateBMI() {
        return this.BMIVal = this.mass / this.height * this.height
    }
}

var johnBMI = john.BMI()
var markBMI = mark.BMI()

if(johnBMI > markBMI) {
    console.log('John\'s BMI is higher')
}else if(johnBMI < markBMI) {
    console.log('Mark\'s BMI is higher')
}else {
    console.log('They both have the same BMI')
}