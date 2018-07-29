export default function sort(arr, num = 3) {
    let Arr = arr.concat();
    let newArr = [];
    if (Arr.length >= 3) {
        while (Arr.length !== 0) {
            newArr.push(Arr.splice(0, num))
        }
    }
    return newArr
}