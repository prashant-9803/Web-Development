let arr = [1, 2, 3, 4, 5];

let twice = (i) => {
  return i * 2;
};

let isEven = (i) => {
  if (i % 2 === 0) return true;
  else return false;
};

//-------------- map -----------------
let ans = arr.map(twice);
console.log(ans);

// prefered way
ans = arr.map((i) => i * 2);
console.log(ans);

//----------------filter-------------------
let ans2 = arr.filter(isEven);
console.log(ans2);

ans2 = arr.filter((i) => i % 2 === 0);
console.log(ans2);
