function parImpar(n){
    if(n%2==0){
        return 'Par'
    } else{
        return 'Impar'
    }
}

function soma (n1, n2){
    resultado = n1 + n2
    return resultado
}

function soma_ver2 (n1, n2){
    return n1 + n2
}

console.log(parImpar(1))
console.log(soma(1,2))
console.log(soma_ver2(1,2))
