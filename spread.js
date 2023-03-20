const arr = [1,2,3,4,5,6,7];

console.log(arr);
console.log(...arr);

const obj = {
  name : '박성희',
  status : '잠옴',
}

console.log(obj);
console.log({...obj});

const tetzData = {
  name: '박성희',
  age : 27,
};

const tetzInfo = {
  nickName : 'chicken',
  status: 'b',
}

const tetz = {
  ...tetzData,
  ...tetzInfo,
  // tetzData,
  // tetzInfo,
};

console.log("-",tetz);

const arr1 = [1,2,3];
const arr2 = ['4','5','6'];

// const str = [
//   ...arr1 , ...arr2
// ]
// console.log(str);

const str = 'test';
console.log([...str]);

const tetz2 = {
  name : 'sh',
  gender: 'F',
  nickName : 'n',
  email : 'psh',
};

const { name, ...restInfo} = tetz2;
console.log(name);
console.log(restInfo);
const arr3 = [1,2,3,4,5,6,7] ;
const [first, ...rest] = arr3;
console.log (first, '//',...rest);

function spread(first,second, ...rest) {
  console.log(first);
  console.log(second);
  console.log(rest);
}

spread(1,2,3,4,5,6,7,7,8,);