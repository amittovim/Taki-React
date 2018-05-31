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
