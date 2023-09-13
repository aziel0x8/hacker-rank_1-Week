'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'miniMaxSum' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function miniMaxSum(arr) {
    // Write your code here
    let min=arr[0],max=arr[0],total=0;
     for (let i = 0; i < arr.length; i++) {
       
        min = Math.min(min, arr[i]);
        max = Math.max(max, arr[i]);
        total += arr[i];
    }
    let totalMax=0,totalMin=0;
    
    totalMax=total-max;
    totalMin=total-min;
    
    console.log(totalMax,totalMin);
    // console.log();
    

}

function main() {

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    miniMaxSum(arr);
}
