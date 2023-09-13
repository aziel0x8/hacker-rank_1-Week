function processData(input) {
    //Enter your code here
     const quer1 = input.trim().split('\n');
    const queue = [];
    let front = 0;

    for (let i = 1; i < quer1.length; i++) {
        const query = quer1[i].split(' ');

        switch (parseInt(query[0])) {
            case 1:
                const element = parseInt(query[1]);
                queue.push(element);
                break;
            case 2:
                front++;
                break;
            case 3:
                console.log(queue[front]);
                break;
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
