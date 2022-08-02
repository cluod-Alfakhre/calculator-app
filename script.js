const numbersContainer=document.querySelector('.numbers');

const theScreen = document.querySelector('.screen');

const theOperators = document.querySelectorAll('.sign.btn');

const resultBtn = document.querySelector('.result');

const toggleBtn = document.querySelector('.theme .toggle');

const deleteBtn = document.querySelector('.delete');

const resetBtn = document.querySelector('.reset');


const body = document.body;

let toggleTheme = 1;

let operatorClicked=false;
let operation='';
let [firstOperand, secondOperand, result] = ["","",""];





function toggleThemeFunc(){
    toggleTheme ++;
    if(toggleTheme > 3){
        toggleTheme = 1 ;
    }

    switch (toggleTheme) {
        case 2:
            toggleBtn.className='toggle second-theme';
            body.className='second-theme';
            break;
        case 3:
            toggleBtn.className='toggle third-theme';
            body.className='third-theme'
            break;
        default:
            toggleBtn.className='toggle first-theme';
            body.className=''
            break;
    }
    
}

function createNumbersDivs(howMany,conatainer){

    for( i = howMany ; i >= 1 ; i--){//reveresd loop start from top to bottom 
       const numberDiv=document.createElement('div');
       numberDiv.className= 'number btn';
       numberDiv.innerHTML = i;// divs will contain numbers

       conatainer.appendChild(numberDiv);
   }

   document.querySelectorAll('.number.btn').forEach( el => el

       .addEventListener( 'click', ()=> { fillOperands(el) } )//these are all the numbers from 0 to 9

   );

}

function fillOperands(theBtn){
    if(!operatorClicked){

        firstOperand += theBtn.innerHTML;
        updateInputValue();

    }else{

        secondOperand += theBtn.innerHTML;
        updateInputValue();

    }
}


function calc(operation){
    
    switch (operation) {

        case "+":
            result= Number(firstOperand) + Number(secondOperand)
            break;
        case "-":
            result= Number(firstOperand) - Number(secondOperand)
            break;
        case "x":
            result= Number(firstOperand) * Number(secondOperand)
            break;
        case "/":
            result= Number(firstOperand) / Number(secondOperand)
            break;

        default:
            break;
    }
    resetFunc()
    firstOperand = `${result}`;
    theScreen.value = result
}



function updateInputValue(){
    let value= `${firstOperand}  ${operation}  ${secondOperand}`
    theScreen.value = value;
}

function deleteFunc(){
    if(!operatorClicked){

        if(firstOperand.length != 0){
            firstOperand = firstOperand.slice(0,-1);
            console.log(firstOperand)
            updateInputValue();
        }

    }else{

        if(secondOperand.length != 0){
            secondOperand = secondOperand.slice(0,-1);
            updateInputValue();
        }else{
            operatorClicked = false;
            operation=''
            deleteFunc()
        }

    }
}   

function resetFunc(){
    [firstOperand, secondOperand] = ["",""];
    operatorClicked=false;
    operation='';
    updateInputValue();
}


function validateInput() {
    theScreen.value = theScreen.value.replace(/[^0-9\-\+\/x*.,]+/, "");
}



theScreen.addEventListener('input',validateInput)


resetBtn.addEventListener('click',()=>{
    resetFunc()
})



createNumbersDivs(9,numbersContainer);//(in this case 9 to 1);



deleteBtn.addEventListener('click',()=>{
    deleteFunc()
})

theOperators.forEach(el => el.addEventListener('click',()=>{

    if(operatorClicked){
        calc(operation);
        firstOperand = result;
        secondOperand = '';
    }

    operatorClicked = true;
    operation = el.innerHTML;
    updateInputValue()

    resultBtn.addEventListener('click', ()=>{ //it doesn't make sence to be clicked before the operator button,
                                                //so i put it inside the operator listener function

        if(secondOperand != ''){
            calc(operation)
        }

    })

}))


toggleBtn.addEventListener('click', ()=>{
    toggleThemeFunc();
})


