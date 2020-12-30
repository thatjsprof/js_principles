// Coding challenge 3a
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

// Coding challenge 3b
var billsInfo = {
    bills: [124, 48, 268, 180, 42],
    tips: [],
    finalBills: [],
    calcTip: function(){
        for(var i = 0; i < this.bills.length; i++) {
            var bill = this.bills[i], tip
            switch(true) {
                case bill < 50:
                    tip = 20
                    break
                case bill >= 50 && bill < 200:
                    tip = 15
                    break
                case bill > 200:
                    tip = 10
                    break
                default:
                    return null
            }
            var finalTip = Math.round((tip / 100) * bill)
            this.tips.push(finalTip)
            this.finalBills.push(finalTip + bill)
        }
    },
    showAll: function() {
        this.calcTip()
        console.log(this.tips, this.finalBills)
    }
}

billsInfo.showAll()