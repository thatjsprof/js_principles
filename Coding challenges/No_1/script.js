/*****************************
* CODING CHALLENGE 1a

Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs
3. Create a boolean variable containing information about whether Mark has a higher BMI than John.
4. Print a string to the console containing the variable from step 3. (Something like "Is Mark's BMI higher than John's? true"). 

GOOD LUCK 😀
*/



/*****************************
* CODING CHALLENGE 1b

John and Mike both play basketball in different teams. In the latest 3 games, John's team scored 89, 120 and 103 points, while Mike's team scored 116, 94 and 123 points.

1. Calculate the average score for each team
2. Decide which teams wins in average (highest average score), and print the winner to the console. Also include the average score in the output.
3. Then change the scores to show different winners. Don't forget to take into account there might be a draw (the same average score)

4. EXTRA: Mary also plays basketball, and her team scored 97, 134 and 105 points. Like before, log the average winner to the console. HINT: you will need the && operator to take the decision. If you can't solve this one, just watch the solution, it's no problem :)
5. Like before, change the scores to generate different winners, keeping in mind there might be draws.

GOOD LUCK 😀
*/

var johnH = 20, johnM = 10, markH = 30, markM = 15
var johnBMI = johnM / johnH ^ 2
var markBMI = markM / markH ^ 2
var isHigher = markBMI > johnBMI
console.log('Is Mark\'s BMI higher than John\'s?', isHigher)

var johnTeam = (89 + 120 + 103) / 3
var markTeam = (116 + 94 + 123) / 3
var maryTeam = (97 + 134 + 105) / 3

// Using switch statements
switch(true) {
    case johnTeam == markTeam:
        console.log('Both teams have the same points', johnTeam)
    case johnTeam > markTeam:
        console.log('John\'s team won with ' + johnTeam + ' points')
    default: 
        console.log('Mark\'s team won with ' + markTeam + ' points')
}

if(johnTeam === markTeam === maryTeam) {
    console.log('All teams have the same points', johnTeam)
}else if(johnTeam > markTeam && johnTeam > maryTeam) {
    console.log('John\'s team won with ' + johnTeam + ' points')
}else if(maryTeam > markTeam && maryTeam > johnTeam) {
    console.log('Mary\'s team won with ' + maryTeam + ' points')
}else {
    console.log('Mark\'s team won with ' + markTeam + ' points')
}