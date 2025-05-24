/**
 * @param {number[]} numbers  A sorted array of integers
 * @param {number} target     The sum we’re looking for
 * @return {number[]}         A pair of 1-based indices whose values add up to target
 */
const twoSum = function(numbers, target) {
  const length = numbers.length;

  for (let i = 0; i < length - 1; i++) {
    for (let j = i + 1; j < length; j++) {
      //console.log('i:' + numbers[i] + ' | j: ' + numbers[j]);
      const tot = numbers[i] + numbers[j];
      if(tot == target){
         return [i + 1, j + 1];
      }
    }
  }
  
  throw new Error('No two numbers add up to the target');
};

// Sample outputs
console.log(twoSum([4, 11, 17, 25], 21));
console.log(twoSum([0, 1, 2, 2, 3, 5], 4));
console.log(twoSum([-1, 0], -1));