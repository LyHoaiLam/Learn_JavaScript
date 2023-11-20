// const number = [1, 2, 3, 4, 5]
// const result = number.reduce((total, number) => {
//     return total + number
// }, 10)

// console.log(result)
Array.prototype.reduce2 = function(callback, result){
    let i = 0// default = 0
    if(arguments.length < 2){// Không chuyền initial Value
        // trường hợp không chuyền vào
        i = 1
        result = this[0] // phần tử đầu tiên cua array
        // Và currentValue phải là phần tử thứ 2 của Array
        // Tức là không đc lắp từ i = 0 mà i = 1
    }
    for(; i < this.length; i++){
        result = callback(result, this[i], i, this)
    }
    return result
}



const number = [1, 2, 3, 4, 5]
const result = number.reduce2((total, number, index, array) => {
    console.log(total, number, index, array)
    return total + number
}, 50)

console.log(result)