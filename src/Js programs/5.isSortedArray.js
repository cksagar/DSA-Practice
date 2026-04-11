function isArraySorted(nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i + 1] < nums[i]) {
      return false;
    }
  }
  return true;
}

console.log(isArraySorted([3, 5, 6, 7, 14]));
