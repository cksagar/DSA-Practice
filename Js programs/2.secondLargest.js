
function findsecondLargest(arr){
    const numArr = arr.map(Number)
    let firstLargest = numArr[0];
    let secondLargest = numArr[1];
    
    for(let i=0;i<numArr.length;i++){
        if(numArr[i]>firstLargest){
            secondLargest = firstLargest;
            firstLargest = numArr[i];
        }else if(numArr[i]>secondLargest && numArr[i] !== firstLargest){
                secondLargest = numArr[i];            
        }
    }
    
    return secondLargest;
}
console.log(findsecondLargest(["2","4","6","5","8","8"]))