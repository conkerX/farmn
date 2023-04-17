const sortAndMergeTwoArrays = (arr1, arr2) => {
  const result = [];
  let pointer1 = 0;
  let pointer2 = 0;

  while (pointer1 < arr1.length && pointer2 < arr2.length) {
    const num1 = arr1[pointer1];
    const num2 = arr2[pointer2];

    if (num1 < num2) {
      result.push(num1);

      pointer1++;
    } else if (num1 > num2) {
      result.push(num2);

      pointer2++;
    } else {
      result.push(num1);
      result.push(num2);

      pointer1++;
      pointer2++;
    }
  }

  while (pointer1 < arr1.length) {
    const num1 = arr1[pointer1];

    result.push(num1);

    pointer1++;
  }

  while (pointer2 < arr2.length) {
    const num2 = arr2[pointer2];

    result.push(num2);

    pointer1++;
  }

  return result;
};

console.log("result ->", sortAndMergeTwoArrays([1, 4, 7, 20], [3, 5, 6]));
