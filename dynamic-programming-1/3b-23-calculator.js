// 23. Калькулятор

// Ограничение времени	2 секунды
// Ограничение памяти	64Mb
// Ввод	стандартный ввод или input.txt
// Вывод	стандартный вывод или output.txt

// Имеется калькулятор, который выполняет следующие операции:
// умножить число X на 2;
// умножить число X на 3;
// прибавить к числу X единицу.
// Определите, какое наименьшее количество операций требуется, чтобы получить из числа 1 число N.

// Формат ввода
// Во входном файле написано натуральное число N, не превосходящее 106.

// Формат вывода
// В первой строке выходного файла выведите минимальное количество операций. 
// Во второй строке выведите числа, последовательно получающиеся при выполнении операций. 
// Первое из них должно быть равно 1, а последнее N. Если решений несколько, выведите любое.

function solve(input) {
    const n = +input.toString().trim();
    const memo = [0, 0, 1];

    for (let i = 3; i <= n; i++) {
        let min = memo[i - 1] + 1;
        if (i % 2 === 0) min = Math.min(min, memo[i / 2] + 1);
        if (i % 3 === 0) min = Math.min(min, memo[i / 3] + 1);
        memo[i] = min;
    }

    const res = [];
    let i = n;
    while (i > 1) {
        res.push(i);
        if (memo[i] === memo[i - 1] + 1) {
            i--;
        } else   if (i % 2 === 0 && memo[i] === memo[i / 2] + 1) {
            i = i / 2;
        } else if (i % 3 === 0 && memo[i] === memo[i / 3] + 1) {
            i = i / 3;
        }
    }
    res.push(1);
    return `${memo[n]}\n${res.reverse().join(' ')}`;
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');
const result = solve(fileContent);
fs.writeFileSync('output.txt', result + '');