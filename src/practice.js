let nums = {};
console.log(nums);
nums[(1,3,5)] = 2;
console.log(nums);
nums[(3,2,1)] = 6;
console.log(nums);
nums[(1,3)] = 10;
console.log(nums);

sum = 0;

for(k in nums){
  sum += nums[k];
}

console.log(nums.length + sum ?? "Invalid Mate", nums, nums.length);

console.log("length of obj: " + nums.length);
