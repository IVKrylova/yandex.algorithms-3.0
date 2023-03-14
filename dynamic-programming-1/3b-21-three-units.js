// 21. Три единицы подряд

// Ограничение времени 1 секунда
// Ограничение памяти 64Mb
// Ввод	стандартный ввод или input.txt
// Вывод стандартный вывод или output.txt

// По данному числу N определите количество последовательностей из нулей и единиц длины N, 
// в которых никакие три единицы не стоят рядом.

// Формат ввода
// Во входном файле написано натуральное число N, не превосходящее 35.

// Формат вывода
// Выведите количество искомых последовательностей. Гарантируется, что ответ не превосходит 231-1.

function solve(input) {
    const n = +input;
    const memo = [0, 2, 4, 7];
    let i = 4;
    while (i <= n) {
        memo[i] = memo[i-1] + memo[i-2] + memo[i-3];
        i+=1;
    }
    
    return memo[n];
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');
const result = solve(fileContent);
fs.writeFileSync('output.txt', result + '');
