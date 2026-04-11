const charsss = 'madam';
function countVC(str) {
  let vowels = 0,
    consonants = 0;
  const vowelsVars = 'aeiou';

  str = str.toLowerCase();

  for (let ch of str) {
    if (ch >= 'a' && ch <= 'z') {
      vowelsVars.includes(ch) ? vowels++ : consonants++;
    }
  }
  return { vowels, consonants };
}
console.log(countVC(charsss));
