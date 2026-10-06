// generics: Generics enable you to create components that work with any data type while still providing compile-time type safety.

function getFirstElement<T>(arr: T[]) : T{
    return arr[0];
}

let output = getFirstElement<string>(["prashant","mahamuni"])
let output2 = getFirstElement<number>([1,2,3])