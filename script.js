// INTSTRUCTIONS FOR THE BASIC + - * /, !!! cannot delete, get percentage or track . number !!!

let firstN = []; // Made from keys, needs to be >emptied
let symbol = '' // Made from keys, needs to be >emptied, only show up once, if it isnt already present
let secondN = [] // Made from keys, needs to be >emptied
let numberOne = 0; // Calculated from firstN, needs to be >emptied
let numberTwo = 0; // Calculated from secondN, needs to be >emptied
let result = ''; // Calculated from numberOne and numberTwo, needs be >emptied

let screen = document.querySelector('#screen');

//     1) .Push the keys content into firstN
//     3) Check that if(symbol !== '') -> .Push the keys content into firstN

let numberKeys = document.querySelectorAll('.num');
numberKeys.forEach(number => number.addEventListener('click', (e) => {
    if(symbol === ''){
        firstN.push(e.target.textContent);
        screen.textContent += e.target.textContent;
        return firstN;
    } else if(symbol !== ''){
        secondN.push(e.target.textContent)
        screen.textContent += e.target.textContent;
        return secondN;
    }
}))

//     2) Get the symbol if it's not already present -> if(symbol !== '')

let symbolKeys = document.querySelectorAll('.symbol');
symbolKeys.forEach(symKey => symKey.addEventListener('click', (e)=>{
    if(symbol === ''){
        symbol = e.target.textContent
        screen.textContent += e.target.textContent;
        return symbol
    }
}))

//     >>>>> Check that when you click "." only push the dot if the array doesnt contain one already -> if(!arr.includes('.))

let dot = document.querySelector('.dot');
dot.addEventListener('click',(e)=>{
    if(firstN.length !== 0){
        if((symbol === '') && (!firstN.includes('.'))){
            firstN.push(e.target.textContent)
            screen.textContent += e.target.textContent;
            return firstN
        } else if((symbol !== '') && (!secondN.includes('.'))){
            screen.textContent += e.target.textContent;
            secondN.push(e.target.textContent)
            return secondN
        }
    }
})


let equal = document.querySelector('#EQUAL')

//     4) Calculate the numberOne and numberTwo by joining the firstN and secondN
//     5) Calculate the result from numberOne and numberTwo, using a switch statement based on the symbol: + - * /
//     6) Create a new variable "splitted" that splits the result.
//     7) Check that if the result already exists from the initial calculation, make it become the firstN. Also empty everything else

equal.addEventListener('click', ()=> {
    if(secondN.length !== 0){
        firstN.join('')
        numberOne = Number(firstN.join(''));
        numberTwo = Number(secondN.join(''));
        switch(symbol){
            case '+':
                result = numberOne + numberTwo
            break;
                case '-':
            result = numberOne - numberTwo
            break;
            case 'x':
                result = numberOne * numberTwo
            break;
            case '÷':
                if(numberTwo === 0){
                    result = "Error"
                    firstN = [];
                    secondN = [];
                    symbol = '';
                    numberOne = '';
                    numberTwo = '';
                } else result = (numberOne / numberTwo).toFixed(12)
            break;
        }
        screen.textContent = result;

        const splitted = (String(result)).split('')
        firstN = splitted;

        secondN = [];
        symbol = '';
        result = '';
        numberOne = '';
        numberTwo = '';
        }
})

//     8) Add the delete button

let deleteButton = document.querySelector('#AC')
deleteButton.addEventListener('click', ()=>{
    screen.textContent = ''
    firstN = []
    secondN = [];
    symbol = '';
    result = '';
    numberOne = '';
    numberTwo = '';
})

//     9) Add the percentage number

let percentage = document.querySelector('#percent');
percentage.addEventListener('click', ()=>{
    if((firstN.length !== 0) && symbol === ''){
        numberOne = (Number(firstN.join('')))/100;
        result = numberOne.toFixed(12)
        screen.textContent = result;
        
        splitted = (String(result)).split('')
        firstN = splitted;

        secondN = [];
        symbol = '';
        result = '';
        numberOne = '';
        numberTwo = '';
    }
})



//     10) Add the reverse button

let reverseButton = document.querySelector('#delete');

reverseButton.addEventListener('click', ()=>{
    let reverseJoined;
    if((symbol === '') && (secondN.length === 0) && (firstN.length !== 0)){
        firstN.pop();
        reverseJoined = firstN.join('')
        console.log(firstN)
        screen.textContent = reverseJoined;
    } else if ((symbol !== '') && (firstN.length !== 0) && (secondN.length === 0)){
        symbol = '';
        let symbolSplitter = screen.textContent;
        let actualSplitter = symbolSplitter.split('');
        actualSplitter.pop()
        let symbolJoiner = actualSplitter.join('');
        firstN = actualSplitter;
        screen.textContent = symbolJoiner;
    } else {
        secondN.pop();
        let index  = screen.textContent.indexOf(symbol);
        let placeholder =  ((screen.textContent.split('')).slice(0, index+1)).join('');
        screen.textContent = placeholder + secondN.join('')
    }
})