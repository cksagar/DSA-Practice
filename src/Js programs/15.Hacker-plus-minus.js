
const arr = [-4, 3, -9, 0, 4, 1]

function plusMinus (arr){
    let arraylength = arr.length;
    let totalPositive = 0;
    let totalNegative = 0;
    let totalZeros = 0;

    for(let item of arr){
        if(item < 0) totalNegative++;
        else if(item >0) totalPositive++;
        else totalZeros++
    }

    console.log(totalPositive/arraylength);
    console.log(totalNegative/arraylength);
    console.log(totalZeros/arraylength);
    
}

plusMinus(arr);

// calling command in terminal : node src/Js programs/15.Hacker-plus-minus.js
