// 8. Минимальный прямоугольник

// Ограничение времени 1 секунда
// Ограничение памяти 64Mb
// Ввод	стандартный ввод или input.txt
// Вывод стандартный вывод или output.txt

// На клетчатой плоскости закрашено K клеток. Требуется найти минимальный по площади прямоугольник, 
// со сторонами, параллельными линиям сетки, покрывающий все закрашенные клетки.

// Формат ввода
// Во входном файле, на первой строке, находится число K (1 ≤ K ≤ 100). На следующих K строках находятся 
// пары чисел Xi и Yi – координаты закрашенных клеток (|Xi|, |Yi| ≤ 10^9).

// Формат вывода
// Выведите в выходной файл координаты левого нижнего и правого верхнего углов прямоугольника.

function solve(input) {
    const data = input.toString().trim().split('\n');
    const k = +data[0];
    const xy = data.slice(1).map(el => el.split(' '));

    const x = [];
    const y = [];

    xy.forEach(el => {
        x.push(el[0]);
        y.push(el[1]);
    });

    return `${Math.min(...x)} ${Math.min(...y)} ${Math.max(...x)} ${Math.max(...y)}`;
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');
const result = solve(fileContent);
fs.writeFileSync('output.txt', result + '');
