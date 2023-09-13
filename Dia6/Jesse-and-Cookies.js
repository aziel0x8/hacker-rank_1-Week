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
 * Complete the 'cookies' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY A
 */

/* MinHeap implementation without payload. */
const MinHeap = { 
    /* siftDown:
     * The node at the given index of the given heap is sifted down in its subtree 
     * until it does not have a child with a lesser value. 
     */
    siftDown(arr, i=0, value=arr[i]) {
        if (i >= arr.length) return;
        while (true) {
            // Choose the child with the least value
            let j = i*2+1;
            if (j+1 < arr.length && arr[j] > arr[j+1]) j++;
            // If no child has lesser value, then we've found the spot!
            if (j >= arr.length || value <= arr[j]) break;
            // Move the selected child value one level up...
            arr[i] = arr[j];
            // ...and consider the child slot for putting our sifted value
            i = j;
        }
        arr[i] = value; // Place the sifted value at the found spot
    },
    /* heapify:
     * The given array is reordered in-place so that it becomes a valid heap.
     * Elements in the given array must have a [0] property (e.g. arrays). That [0] value
     * serves as the key to establish the heap order. The rest of such an element is just payload.
     * It also returns the heap.
     */
    heapify(arr) {
        // Establish heap with an incremental, bottom-up process
        for (let i = arr.length>>1; i--; ) this.siftDown(arr, i);
        return arr;
    },
    /* pop:
     * Extracts the root of the given heap, and returns it (the subarray).
     * Returns undefined if the heap is empty
     */
    pop(arr) {
        // Pop the last leaf from the given heap, and exchange it with its root
        return this.exchange(arr, arr.pop());
    },
    /* exchange:
     * Replaces the root node of the given heap with the given node, and returns the previous root.
     * Returns the given node if the heap is empty.
     * This is similar to a call of pop and push, but is more efficient.
     */
    exchange(arr, value) {
        if (!arr.length) return value;
        // Get the root node, so to return it later
        let oldValue = arr[0];
        // Inject the replacing node using the sift-down process
        this.siftDown(arr, 0, value);
        return oldValue;
    },
    /* push:
     * Inserts the given node into the given heap. It returns the heap.
     */
    push(arr, value) {
        // First assume the insertion spot is at the very end (as a leaf)
        let i = arr.length;
        let j;
        // Then follow the path to the root, moving values down for as long as they
        // are greater than the value to be inserted
        while ((j = (i-1)>>1) >= 0 && value < arr[j]) {
            arr[i] = arr[j];
            i = j;
        }
        // Found the insertion spot
        arr[i] = value;
        return arr;
    }
};


function cookies(k, arr) {
    // Remove values that are already OK so to keep heap size minimal
    const heap = arr.filter(val => val < k);
    let greaterPresent = heap.length < arr.length; // Mark whether there is a good cookie
    MinHeap.heapify(heap);
    let result = 0;
    while (heap.length > 1) {
        const newValue = MinHeap.pop(heap) + MinHeap.pop(heap) * 2;
        // Only push result back to heap if it still is not great enough
        if (newValue < k) MinHeap.push(heap, newValue);
        else greaterPresent = true; // Otherwise just mark that we have a good cookie
        result++;
    }
    // If not good cookies were created, then return -1
    // Otherwise, if there is still 1 element in the heap, add 1
    return greaterPresent ? result + heap.length : -1;
}

// Example run
console.log(cookies(9, [2,7,3,6,4,6])); // 4

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const A = readLine().replace(/\s+$/g, '').split(' ').map(ATemp => parseInt(ATemp, 10));

    const result = cookies(k, A);

    ws.write(result + '\n');

    ws.end();
}
