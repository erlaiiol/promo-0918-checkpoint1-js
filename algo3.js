/*
* Given a number N return the index value of the Fibonacci sequence.
* Ex: fibo(6)  // return 13;
* Ex: fibo(10) // return 89;
There's a mistake: 6th index of fibonacci numbers is 8, not 13; therefore fibonacci 7th index is 13. 
1, 1, 2, 3, 5, 8, 13, 21*/
let N=Math.floor(Math.random()*11)//any number between
console.log("The fibonacci index is: " + N)

function fibonacci(num) {
    let fibnumber=[1];

    for (let i=0; i<N+1; i++){
        if (fibnumber[i-1]==undefined || fibnumber[i-2]==undefined){
            fibnumber[i]=i
        }
        else {
            fibnumber[i]=fibnumber[i-2]+fibnumber[i-1]
        }
        
    }
    console.log(fibnumber[N]);
}


fibonacci(N)