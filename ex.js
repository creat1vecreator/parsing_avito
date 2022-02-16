const testStr = '1-к. квартира, 35,9 м², 7/9 эт.';
console.log(testStr.split('  '));
const testrOth = '1-к. квартира, 35,9 м², 7/9 эт.';
const testrOthCont = testrOth.replace(/ /g, ' ');
console.log(testrOthCont)
const testArr = ['1-к.', 'квартира,', '35,9', 'м²,', '15/98', 'эт.'];
const findRooms = () => {
    let rooms = '';
    for (let i = 0; i < arr[0].length; i++) {
        if (Number(arr[0][i])) {
            rooms += arr[0][i];
        }
        else return rooms;
    }
}
const findSquareAvito = (arr) => {
    return arr[2];
}

const findFloorFlatAvito = (arr) => {
    let res = '';
    for (let i = 0; i < arr[4].length; i++) {
       if (isFinite(arr[4][i])) {
           console.log('Is number: ', arr[4][i]);
           res += arr[4][i];
       }
       else {
           console.log('Is not a number: ', arr[4][i], 'Is finite? ', isFinite(arr[4][i]));
           console.log('Returned res');

           return res;
       }
    }
}
console.log('Find rooms:', findRooms(testArr));
console.log('Find square:', findSquareAvito(testArr));
console.log('Find floor of flat:', findFloorFlatAvito(testArr));

console.log('15/90'.split('/'));