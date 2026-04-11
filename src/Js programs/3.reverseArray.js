function reverseArray(arr) {
  // //first approach
  //       let left = 0;
  //   let right = arr.length - 1;

  //   while (left < right) {
  //     // swap elements
  //     let temp = arr[left];
  //     arr[left] = arr[right];
  //     arr[right] = temp;

  //     left++;
  //     right--;
  //   }

  // //second approcah
  const resArr = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    resArr.push(arr[i]);
  }

  return resArr;
}

console.log(reverseArray([1, 2, 3, 4, 5, 6]));
