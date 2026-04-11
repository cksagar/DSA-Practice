function removeDuplicates(arr) {
  if (arr.length === 0) return [];

  let i = 0;

  for (let j = 1; j < arr.length; j++) {
    if (arr[j] !== arr[i]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return arr.slice(0, i + 1);
}

console.log(removeDuplicates([1, 2, 3, 3, 4, 4, 4, 5]));
