let name = 'madam'
function isPalindrome(str) {
        let revStr = ''
          for (let i = str.length-1; i >=0; i--) {
          revStr += str[i]
          }
          if(revStr === str) return 'yes its palindrome';
          return 'not a palindrome'
}
console.log(isPalindrome(name));