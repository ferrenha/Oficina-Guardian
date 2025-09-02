function maiorNumero(array) {
    let maior = array[0];

    for (let i = 1; i < array.length; i++) {
        if (array[i] > maior) {
            maior = array[i];
        }
    }
    return maior;
}

let numeros = [3, 7, 2, 9];
console.log(maiorNumero(numeros));