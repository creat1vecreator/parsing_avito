const findRoomsAvito = (arr) => {
    let rooms = '';
    for (let i = 0; i < arr[0].length; i++) {
        if (Number(arr[0][i])) {
            rooms += arr[0][i];
        } else return rooms;
    }
}

const findSquareAvito = (arr) => {
    return arr[2];
}
const findFloorFlatAvito = (arr) => {
    return arr[4].split('/')[0];
}
const findFloorHouseAvito = (arr) => {
    return arr[4].split('/')[1];
}

module.exports = {findRoomsAvito, findSquareAvito, findFloorFlatAvito, findFloorHouseAvito};
