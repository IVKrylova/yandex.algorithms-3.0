// 28. Ход конём
// Ограничение времени	1 секунда
// Ограничение памяти	64Mb
// Ввод	стандартный ввод или input.txt
// Вывод	стандартный вывод или output.txt
// Дана прямоугольная доска N × M (N строк и M столбцов). В левом верхнем углу находится шахматный конь, которого необходимо переместить в правый нижний угол доски. В данной задаче конь может перемещаться на две клетки вниз и одну клетку вправо или на одну клетку вниз и две клетки вправо.

// Необходимо определить, сколько существует различных маршрутов, ведущих из левого верхнего в правый нижний угол.

// Формат ввода
// Входной файл содержит два натуральных числа N и M , .

// Формат вывода
// В выходной файл выведите единственное число — количество способов добраться конём до правого нижнего угла доски.

// Пример 1
// Ввод	Вывод
// 3 2
// 1
// Пример 2
// Ввод	Вывод
// 31 34
// 293930

function solve(input) {
    const data = input.toString().trim().split('\n');
    const [n, m] = data[0].split(' ').map(Number);
    const dp = Array.from(Array(n + 1), () => new Array(m + 1));

    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= m; j++) {
            dp[i][j] = 0;
        }
    }

    dp[1][1] = 1;

    for (let i = 2; i <= n; i++) {
        for (let j = 2; j <= m; j++) {
            dp[i][j] = dp[i - 1][j - 2] + dp[i - 2][j - 1];
        }
    }

    return dp[n][m];
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');
const result = solve(fileContent);
fs.writeFileSync('output.txt', result + '');
