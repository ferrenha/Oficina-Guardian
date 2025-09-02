const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Digite sua idade: ", (resposta) => {
    let idade = parseInt(resposta);
    if (idade >= 18) {
        console.log("Pode jogar o CTF!");
    } else {
        console.log("Espere mais um pouco...");
    }
    rl.close(); 
});

