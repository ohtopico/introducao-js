let amigo = {
    nome: 'Rodrigo', 
    sexo: 'M', 
    peso: 70.1, 
    engordar(peso){
        console.log('Engordou')
        this.peso +=p
    }
}

amigo.engordar(5)
console.log(`${amigo.nome} pesa ${amigo.peso}Kg`)