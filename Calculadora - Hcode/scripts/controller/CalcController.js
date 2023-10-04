class CalcController {

    constructor(){
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#date");
        this._timeEl = document.querySelector("#hour");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize(){
        this.setDisplayDateTime()

        setInterval(()=>{
            //atualiza a data a cada 1000 milisegundos
            this.setDisplayDateTime();

        }, 1000);
    }

    addEventListenerAll(element, events, fn){

        //slit separa os eventos recebidos
        events.split(' ').forEach(event => {
            
            //quando clicamos no botão, ele pode reconhecer 2x o mesmo número, então o false é para impedir que isso ocorra
            element.addEventListener(event, fn, false); 

        })
    
    }
    
    clearAll(){
        //esvazia o array
        this._operation = [];
    }

    clearEntry(){
        //retira o último item do array 
        this._operation.pop();
    }

    getLastOperation(){
        /* dado o vetor [1,2,"+"]: 
            length é 3 mas
            a posição do último item no vetor é 2*/
        return this._operation[this._operation.length-1];
    }

    setLastOperation(value){
        this._operation[this._operation.length-1] = value;
    }

    isOperator(value){
        //verifica se é um operador
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
    }

    pushOperation(value){
        this._operation.push(value);
        if (this._operation.length > 3) {
            this.calc();
        }
    }

    calc(){
        let last = this._operation.pop();
        let result = eval(this._operation.join("")); //faz tudo virar a mesma string usando o separador vazio com join e calcula com eval
        this._operation = [result, last];
    }

    setLastNumberToDisplay(){
        let lastNumber;

        for (let i = this._operation.length-1; i >= 0; i--){
            
            if (!this.isOperator(this._operation[i])) {
                lastNumber = this._operation[i];
                break;
            }
        }
        this.displayCalc = lastNumber;
    }

    addOperation(value){
        console.log('Teste do array', isNaN(this.getLastOperation()));

        //   Validação para ver se é um número ou uma operação
        if (isNaN(this.getLastOperation())){  //NaN (not a number)

            //Caso o usuário selecione dois operadores em sequência, seleciona apenas o último
            if (this.isOperator(value)) { 
                this.setLastOperation(value);
            } else if (isNaN(value)){
                console.log(value);
            } else {
                this._operation.push(value);
            }
        } else {
            //Concatena uma sequência de números
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseInt(newValue)); //converte de string para número

            //atualizar display
            this.setLastNumberToDisplay();
        }

        console.log(this._operation);
    }

    setError(){
        this.displayCalc = "Error";
    }

    execBtn(value){
        //Vai guardando num array as operações que o usuário clica
        switch (value) {

            case 'ac':
                //apaga tudo
                this.clearAll();
                break;

            case 'ce':
                //apaga a última entrada
                this.clearEntry();
                break;

            case 'soma':
                this.addOperation('+');
                break;

            case 'subtracao':
                this.addOperation('-');
                break;

            case 'divisao':
                this.addOperation('/');
                break;

            case 'multiplicacao':
                this.addOperation('*');
                break;

            case 'porcento':
                this.addOperation('%');
                break;

            case 'igual':
                
                break;

            case 'ponto':
                this.addOperation('.');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;

        }

    }

    initButtonsEvents(){
        //seleciona todos os botões da calculadora
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index)=>{
            //percorre a lista de botões e adiciona um EventListener

            btn.addEventListener('click', e => {
                //percebe cliques dos usuários nos botões
                console.log(btn.className.baseVal.replace("btn-",""));
            })

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                //faz o mouse "parecer clicável" quando está em cima do botão
                btn.style.cursor = "pointer";

            })
        })

    }

    setDisplayDateTime(){
        //formata a data no display
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        return this._timeEl.innerHTML = value;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        return this._dateEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        //pega a data atual
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }

}