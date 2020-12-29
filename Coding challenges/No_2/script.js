/*****************************
* CODING CHALLENGE 2

John and his family went on a holiday and went to 3 different restaurants. The bills were $124, $48 and $268.

To tip the waiter a fair amount, John created a simple tip calculator (as a function). He likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.

In the end, John would like to have 2 arrays:
1) Containing all three tips (one for each bill)
2) Containing all three final paid amounts (bill + tip).

(NOTE: To calculate 20% of a value, simply multiply it with 20/100 = 0.2)

GOOD LUCK 😀
*/

function tipCalculator(bill) {
    var tip
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
            return 'bill too high'
    }
    return (tip / 100) * bill 
}

var bills = [124, 48, 268]
var tipArr = new Array()
for(bill of bills) {
    var tip = tipCalculator(bill)
    tipArr.push(Math.round(tip))
}

var billsArr = bills.map((bill, index) => {
    return bill + tipArr[index]
})

console.log(tipArr, billsArr)