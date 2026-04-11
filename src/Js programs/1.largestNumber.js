function largestNumber(arr) {
  if (arr.length === 0) return 'please provide valid input';
  let maxNum = arr[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > maxNum) {
      maxNum = arr[i];
    }
  }
  return maxNum;
}

console.log(largestNumber([2, 4, 6, 1, 3, 8, 5]));
