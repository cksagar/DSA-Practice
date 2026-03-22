function removeDuplicates(nums) {
    let resArray = [];
    for(let i=0;i<nums.length;i++){
        if(!resArray.includes(nums[i])){
            resArray.push(nums[i])
        }
    }
    
    return resArray;
}

console.log(removeDuplicates([3,5,4,6,7,2,4,5]))