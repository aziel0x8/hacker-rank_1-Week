function processData(input) {

    const inputLines = input.trim().split('\n');

    let final = "";
    let finalBuffer = [final];

    for (let i = 1; i < inputLines.length; i++) {
        const el = inputLines[i];

        if (el.length > 1) {
            const elSplit = el.split(" ");
            const ops = elSplit[0];
            const item = elSplit[1];

            if (ops === "1") {
                finalBuffer.push(final);
                final = final + item;
            }

            if (ops === "2") {
                finalBuffer.push(final);
                final = final.substring(0, final.length - item);
            }

            if (ops === "3") {
                console.log(final.substring(item - 1, item));
            }
        } else {
            final = finalBuffer.pop();
        }
    }
}






process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
