/*
    Write a function for each of the following problems:

    [1] Console logs "hello"
    [2] Console logs "world"
    [3] Takes a parameter called "name" and console logs it
    [4] Takes a parameter called "name" and console logs "hello" + name
    [5] Takes a parameter called "number" and multiplies it by itself, then console logs the result
    [6] Take a number as a parameter and return itself squared
    [7] Have 3 optional parameters, all numbers. Add all the numbers together. If the function is called without passing any numbers in, simply return 10
*/

function sayHello(){
 console.log('Hello')
}
sayHello()

function callName(name){
   //  console.log("Hello" + name) <- this is the same to the below one//
    console.log(`Hello, ${name}`)
}
callName("Kevin")
callName("Chris")
callName("Sarah")

// additional //
function printNum(num) { console.log(num)};

function printNum(num) { return (num)}; 
