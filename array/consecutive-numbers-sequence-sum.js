function findConsecutiveItemsSum(nums, target) {
  var cur = 0, l = 0, r = 0;

  while(cur !== target && r < nums.length) {
    cur = target > cur?
      cur + nums[r++] : cur - nums[l++];
  }

  return cur === target && nums.slice(l, r);
}

var nums = [1, 3, 4, 5, 6, 9, 1, 2, 3, 4, 5];
console.log(findConsecutiveItemsSum(nums, 12));

function threeSum(nums) {
  var result = [];

  if(nums.length < 3) {
    return result;
  }

  nums.sort();

  for(var i = 0; i < nums.length - 2; i++) {
    if(i == 0 || nums[i] > nums[i - 1]) {
      var s = i + 1;
      var e = nums.length - 1;
      var negate = -nums[i];

      while(s < e) {
        if(nums[s] + nums[e] == negate) {
          result.push([
            nums[i], nums[s], nums[e]
          ]);
          s++;
          e--;

          while(s < e && nums[e] == nums[e + 1]) {
            e--;
          }
          while(s < e && nums[s] == nums[s - 1]) {
            s++;
          }
        }
        else if(nums[s] + nums[e] < negate) {
          s++;
        }
        else {
          e--;
        }
      }
    }
  }

  return result;
}

var nums = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(nums));
