// 30. НОП с восстановлением ответа

// Ограничение времени 1 секунда
// Ограничение памяти 64Mb
// Ввод	стандартный ввод или input.txt
// Вывод стандартный вывод или output.txt

// Даны две последовательности, требуется найти и вывести их наибольшую общую подпоследовательность.

// Формат ввода
// В первой строке входных данных содержится число N – длина первой последовательности 
// (1 ≤ N ≤ 1000). Во второй строке заданы члены первой последовательности (через пробел) – 
// целые числа, не превосходящие 10000 по модулю.

// В третьей строке записано число M – длина второй последовательности (1 ≤ M ≤ 1000). 
// В четвертой строке задаются члены второй последовательности (через пробел) – целые числа, 
// не превосходящие 10000 по модулю.

// Формат вывода
// Требуется вывести наибольшую общую подпоследовательность данных последовательностей, через пробел.

function solve(input) {
    const data = input.toString().trim().split('\n');
    const n = +data[0];
    const arr1 = data[1].split(' ').map(Number);
    const m = +data[2];
    const arr2 = data[3].split(' ').map(Number);
    const dp = Array.from(Array(n + 1), () => new Array(m + 1).fill(0));
    
    for (let i = 1; i < n + 1; i++) {
        for (let j = 1; j < m + 1; j++) {
            if (arr1[i - 1] === arr2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    let i = n;
    let j = m;
    const res = [];

    while (i > 0 && j > 0) {
        if (arr1[i - 1] === arr2[j - 1]) {
            res.push(arr1[i - 1]);
            i--;
            j--;
        } else if (dp[i][j] === dp[i - 1][j]) {
            i--;
        } else {
            j--;
        }
    }

    return res.reverse().join(' ');
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');
const result = solve(fileContent);
fs.writeFileSync('output.txt', result + '');
