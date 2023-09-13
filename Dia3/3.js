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
 * Complete the 'caesarCipher' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER k
 */

function caesarCipher(s, k) {
    // Write your code here
let cadenafinal = '';

for (let i = 0; i < s.length; i++) {
    let solo = s[i];

    if (solo.match(/[a-zA-Z]/)) {
        let mayusculas= solo === solo.toUpperCase();
        let inicio= mayusculas ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
        let final = mayusculas ? 'Z'.charCodeAt(0) : 'z'.charCodeAt(0);

        solo = String.fromCharCode((solo.charCodeAt(0) - inicio+ k) % 26 + inicio);
    }

    cadenafinal += solo;
}

return cadenafinal;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const s = readLine();

    const k = parseInt(readLine().trim(), 10);

    const result = caesarCipher(s, k);

    ws.write(result + '\n');

    ws.end();
}
