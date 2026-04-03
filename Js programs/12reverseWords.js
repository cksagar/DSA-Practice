let name = 'Hello World from Javascript'
function reverseWords(str) {
let words = [];  // storing array of words
let word = '' //storing single word
        for(let char of str.trim()){
            if(char === " "){
                if(word){
                    words.push(word);
                    word = ""
                }
            }else{
                    word += char;
                }
        }
       if(word) words.push(word);
        return words.reverse().join(" ")
}

console.log(reverseWords(name));