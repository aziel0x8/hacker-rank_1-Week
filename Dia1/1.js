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
 * Complete the 'plusMinus' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function plusMinus(arr) {
    // Write your code here
    let positive=0,negative=0,cero=0;
    for(let i=0; i<arr.length; i++){
        if(arr[i]>0){
            positive++;
        }else if(arr[i]<0){
            negative++
        }else{
             cero++;
        }
    }
    let Spositive,Snegetivos,Scero;
    Spositive=positive/arr.length;
    Snegetivos=negative/arr.length;
    Scero=cero/arr.length;
    console.log(Spositive.toFixed(6));
    console.log(Snegetivos.toFixed(6));
    console.log(Scero.toFixed(6));

}

function main() {
    const n = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    plusMinus(arr);
}
