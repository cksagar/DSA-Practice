function moveAllZerosToEnd(arr) {
  let insertPos = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      arr[insertPos] = arr[i];
      insertPos++;
      console.log(insertPos);
    }
  }
  for (let i = insertPos; i < arr.length; i++) {
    arr[i] = 0;
  }
  return arr;
}
console.log(moveAllZerosToEnd([1, 0, 3, 0, 5]));
