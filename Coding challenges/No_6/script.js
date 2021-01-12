class Element {
    constructor(name, buildYear) {
        this.name = name
        this.buildYear = buildYear
    }

    returnAge() {
        this.age = new Date().getFullYear - this.buildYear
        return this.age
    }
}

class Park extends Element {
    constructor(name, buildYear, area, trees) {
        super(name, buildYear)
        this.area = area
        this.trees = trees
    }

    getTree() {
        if(this.trees > 1000) console.log(`${this.name} has more than 1000 trees`)
    }

    treeDensity() {
        this.density = this.trees / this.area
        console.log(`${this.name} has a tree density of ${this.density}`)
    }
}

class Street extends Element {
    constructor(name, buildYear, length, size) {
        super(name, buildYear)
        this.size = size
        this.length = length
    }

    classification() {
        let classification = new Map()
        classification.set(1, 'small')
        classification.set(2, 'medium')
        classification.set(3, 'large')
        classification.set(4, 'normal')

        console.log(`${this.name}, built in ${this.buildYear} is a ${classification.get(this.size)} street`)
    }
}

var data = {
    parks: [],
    streets: []
}

createPark = (name, buildYear, area, trees) => {
    var park = new Park(name, buildYear, area, trees)
    data.parks.push(park)
}

createStreet = (name, buildYear, length, size = 4) => {
    var street = new Street(name, buildYear, length, size)
    data.streets.push(street)
}

createStreet('SmallVille', 1998, 10, 1), 
createStreet('parkVilla', 1990, 13, 3),
createStreet('gramecy', 2000, 15, 3),
createStreet('ivy', 2001, 12, 1)

createPark('Illa', 1998, 100, 100), 
createPark('Londa', 2001, 130, 3000),
createPark('Nike', 2003, 150, 300),
createPark('Honda', 2002, 1200, 1000)

function calculateAge(array) {
    let sum = array.reduce((prev, cur, index) => prev + cur)
    return [sum, sum / array.length]
}

let parksReport = function(p) {
    var ages

    console.log('--------------- Parks Report ----------------')

    p.forEach(park => {
        park.treeDensity()
        park.returnAge()
    })

    var ages = p.map(cur => cur.age)
    var [total_ages, average_age] = calculateAge(ages)

    console.log(`All our parks have an average age of ${average_age}`)
    
    var index = p.map(cur => cur.trees).findIndex(cur => cur >= 1000)
    if(index != -1) {
        console.log(`${p[index].name} has more than 1000 trees`)
    }
}

let streetsReport = (s) => {
    var lengths

    console.log('--------------- Streets Report ----------------')

    lengths = s.map(cur => cur.length)
    var [total_length, average_length] = calculateAge(lengths)

    console.log(`Our ${s.length} have an average length of ${average_length} and a total length of ${total_length}`)

    s.forEach(street => {
        street.classification()
    })
}
parksReport(data.parks)
streetsReport(data.streets)