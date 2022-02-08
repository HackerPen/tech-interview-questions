const threeSum = nums => {
  if (nums === null || nums.length < 3) return [];
  const triplets = [], n = nums.length;
  nums.sort((a,b) => a-b);
  for (let i = 0; i < n-2; i++){
      if (i > 0 && nums[i] === nums[i-1]) continue;
      let j = i + 1, k = n-1;
      while (j < k){
          let sum = nums[i] + nums[j] + nums[k];
          if (sum === 0){
              triplets.push([nums[i], nums[j], nums[k]]);
              j++;
              while (nums[j] === nums[j-1]) j++;
          } else if (sum < 0){
              j++;
              while (nums[j] === nums[j-1]) j++;
          } else {
              k--;
              while (nums[k] === nums[k+1]) k--;
          }
      }
  }

  return triplets;
}
