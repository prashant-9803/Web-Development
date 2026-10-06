interface Person {
    name: string,
    age: number,
    greet(phrase: string): void
}

// interface can be implemented
class emp implements Person {
    name: string
    age: number

    constructor(age: number, name: string) {
        this.name = name
        this.age = age
    }

    greet(phrase: string) {
        console.log("hi" + phrase)
    }
}



// type: similar to interface but some extra features
type User = {
    firstName: string,
    lastName: string,
    age: number
}

let user: User = {
    firstName: "prashant", 
    lastName: "mahamuni", 
    age: 23
}


// extra features
// 1) Union
type strOrNum = string | number

let abc: strOrNum =  "prashant"



// 2) Intersection 
type Employee = {
    name: string
    startDate: Date
}

type Manager = {
    name: string,
    dept: string
}

// Intersection
type TeamLead = Employee & Manager

// implementation  of intersection
let teamLead : TeamLead = {
    name: "prashant",
    startDate: new Date(),
    dept: "TLM"
}