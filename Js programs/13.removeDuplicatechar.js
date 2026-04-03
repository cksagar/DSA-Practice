let name = 'JavaScript'
function removeDuplicate(str) {
    
    trimString = str.trim();
    uniqueStr = new Set();
    result = ''
    
    for(let char of trimString){
        if(!uniqueStr.has(char)){
            uniqueStr.add(char);
             result += char;
        }
    }
    return result
}
console.log(removeDuplicate(name));