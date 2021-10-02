function multiply(a,b){
    return a*b
}

function square(a){
    return multiply(a,a)
}

function printSquare(n){

    var squared= square(n);
    console.log(squared);
}

printSquare(6);