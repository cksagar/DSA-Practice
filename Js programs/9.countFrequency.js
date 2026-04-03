fruitArray = ["apple", "banana", "apple", "orange", "banana", "apple"]


function countFrequency(arr) {
        const countMap = new Map();
          for (let i = 0; i < arr.length; i++) {
          countMap.set(arr[i],(countMap.get(arr[i])|| 0)+1)
          }
          return countMap;
}
console.log(countFrequency(fruitArray))