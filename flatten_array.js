const a = [1, 2, 3, 4, 5, 6, 7, 8];
const b = [[1], [2, 3, [4]], 5, [[[6, 7], 9, [10, [11, [12, [13]]]]]], 8];
  
let numbers = [];

const flattenArray = (arr=[]) => {
  if (!arr.length) return numbers;

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flattenArray(arr[i]);
    } else {
      numbers.push(arr[i]);
    }
  }

  return numbers;
}

console.log(flattenArray(b));
