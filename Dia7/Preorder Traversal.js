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
 * Complete the 'noPrefix' function below.
 *
 * The function accepts STRING_ARRAY words as parameter.
 */

function noPrefix(words) {
    // Write your code here
    let Good = true,bad = '';
    let array = {};

    for (const move of words) {
        let transport = array;

        for (let i = 0; i < move.length; i++) {
            let char = move[i];

            if (!transport[char]) {
                if (i === move.length - 1) {
                    transport[char] = { isEnd: true };
                } else {
                    transport[char] = {};
                }
            } else if (i === move.length - 1 || transport[char].isEnd) {
                Good = false;
                bad = move;
                break;
            }

            transport = transport[char];
        }

        if (!Good) {
            break;
        }
    }

    if (Good) {
        console.log('GOOD SET');
    } else {
        console.log('BAD SET');
        console.log(bad);
    }
}


function main() {
    const n = parseInt(readLine().trim(), 10);

    let words = [];

    for (let i = 0; i < n; i++) {
        const wordsItem = readLine();
        words.push(wordsItem);
    }

    noPrefix(words);
}
