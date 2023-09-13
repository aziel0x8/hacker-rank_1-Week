'use strict';

const fs = require('fs');

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
 * Complete the 'legoBlocks' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 */
//////////////////////////////////////////
const modulo = Math.pow(10, 9) + 7;
const bimodulo = BigInt(modulo)
function mod(num) {
    return num < 0 ? (num % modulo) + modulo : num % modulo;
}
function bigmod(num) {
    return num < 0 ? (num % bimodulo) + bimodulo : num % bimodulo;
}




////////////////////////////////////
function legoBlocks(n, m) {
    // Write your code here
     let singleRow = [0n, 1n, 2n, 4n, 8n]
    
    let singleMLine;
    
    if (m <= 4) {
        singleMLine = singleRow[m];
    } else {
        let length = 5;
        while (length <= m) {
            singleMLine = 0n;
            for (let i = singleRow.length - 4; i < singleRow.length; i++) {
                singleMLine += singleRow[i]
            }
            singleMLine = bigmod(singleMLine);
            singleRow.push(singleMLine);
            length ++
        }
    }
    
    let nRow = Array.from(singleRow);
     for (let rowCount = 2; rowCount <= n; rowCount++) {
        for (let i = 1; i < nRow.length; i++) {
            nRow[i] = bigmod(nRow[i] * singleRow[i]);
        }
    }
    
    let nRowSolid = Array(singleRow.length);
    nRowSolid[0] = 0n;
    nRowSolid[1] = 1n;
    
    
    
    for (let colCount = 2; colCount <= m; colCount++) {
        let count = 0n;
        for (let split = 1; split < colCount; split++) {
            count += bigmod(nRowSolid[split] * nRow[colCount - split]);
        }
        nRowSolid[colCount] = bigmod(nRow[colCount] - count);
    }
        
    return Number(bigmod(nRowSolid[m]));

    
    
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);

        const m = parseInt(firstMultipleInput[1], 10);

        const result = legoBlocks(n, m);

        ws.write(result + '\n');
    }

    ws.end();
}
