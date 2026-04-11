function rotateLeftByOne(arr) {
  let left = arr[0];
  for (let i = 0; i < arr.length - 1; i++) {
    arr[i] = arr[i + 1];
  }

  arr[arr.length - 1] = left;
  return arr;
}

console.log(rotateLeftByOne([1, 2, 3, 4, 5]));
