let Tval = 0; 
let stored = "0"; //what's on display

let previousOperator = null;

const calcScreen = document.querySelector(".numbers");

document.querySelector('.cal-btn').addEventListener("click",function(event){

    //call function buttonClick
    buttonClick(event.target.innerHTML);
});

//separates de value of the button clicks into NotANumber and Numbers
function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    rerenderScreen();
}

function handleSymbol(value){
    switch (value){
        case "Cle":
            stored = "0";
            Tval = 0;
            previousOperator = null;
            break;
        case "=":
            if(previousOperator === null){ //this would mean that there is nothing to be calculated yet
                return;
            }
            flushOperation(parseInt(stored));
            stored = "" + Tval;
            previousOperator = null;
            Tval = 0;
            break;
        case "del":
            if(stored.length === 1){ //if the screen is any single number, always turn it to 0 when deleting
                stored = "0";
            }
            else{
                stored = stored.substring(0,stored.length-1); //delete the numbers one by one
            }
            break;
        default:
            handleMath(value);
            break;
    }
}

function handleNumber(value){
    if(stored === "0"){
        stored = value;
    }else{
        stored += value;
    }
}

function handleMath(value){
    const internalBuffer = parseInt(stored);
    
    if (Tval === 0){
        Tval = internalBuffer;
    }else{
        flushOperation(internalBuffer);
    }

    previousOperator = value;

    stored = "0";
}

function flushOperation(internalBuffer){
    if(previousOperator === "+"){
        Tval += internalBuffer;
    }else if(previousOperator === "-"){
        Tval -= internalBuffer;
    }else if(previousOperator === "x"){
        Tval *= internalBuffer;
    }else{
        Tval /= internalBuffer;
    }
}

function rerenderScreen(){
    calcScreen.value = stored;
}