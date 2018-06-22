export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export function shuffleArray(arr) {
    var i, j;
    var length = arr.length - 1;
    for (i = 0; i < length; i++) {
        j = getRandomInt(0, length);
        swap(i, j, arr);
    }
}

export function swap(x, y, arr) {
    var tmp = arr[y];
    arr[y] = arr[x];
    arr[x] = tmp;
}

export function insertToEndOfArray(item, array) {
    array.push(item);
}

export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function pullItemFromArray(item, array) {

    return array.splice(findIndexOfItemInArray(item, array), 1)[0];
}

export function pullItemFromEndOfArray(array) {
    return pullItemFromArray(array[array.length - 1], array);
}

export function findIndexOfItemInArray(targetItem, array) {
    return array.findIndex(item => targetItem === item);
}

export function getKey(obj, index) {
    return Object.keys(obj)[index];
}

export function getFirstItemByMatchConditions(arr, conditionList) {
    return arr.find(function (item) {
        return conditionList.reduce(function (accumulator, condition) {
            let key = getKey(condition, 0);
            let value = condition[key];
            return accumulator && item[key] === value;
        }, true);
    });
}

