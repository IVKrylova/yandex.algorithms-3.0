// 36. Длина кратчайшего пути
// Все языки	Python 3.6
// Ограничение времени	1 секунда	5 секунд
// Ограничение памяти	64Mb	256Mb
// Ввод	стандартный ввод или input.txt
// Вывод	стандартный вывод или output.txt
// В неориентированном графе требуется найти длину минимального пути между двумя вершинами.

// Формат ввода
// Первым на вход поступает число N – количество вершин в графе (1 ≤ N ≤ 100). Затем записана матрица смежности (0 обозначает отсутствие ребра, 1 – наличие ребра). Далее задаются номера двух вершин – начальной и конечной.

// Формат вывода
// Выведите L – длину кратчайшего пути (количество ребер, которые нужно пройти).

// Необходимо вывести путь (номера всех вершин в правильном порядке). Если пути нет, нужно вывести -1.

// Пример
// Ввод	Вывод
// 10
// 0 1 0 0 0 0 0 0 0 0
// 1 0 0 1 1 0 1 0 0 0
// 0 0 0 0 1 0 0 0 1 0
// 0 1 0 0 0 0 1 0 0 0
// 0 1 1 0 0 0 0 0 0 1
// 0 0 0 0 0 0 1 0 0 1
// 0 1 0 1 0 1 0 0 0 0
// 0 0 0 0 0 0 0 0 1 0
// 0 0 1 0 0 0 0 1 0 0
// 0 0 0 0 1 1 0 0 0 0
// 5 4

function solve(input) {
    const data = input.toString().trim().split('\n');
    const n = +data[0];
    const matrix = data.slice(1, data.length - 1).map(el => el.split(' '));
    const [v, t] = data[data.length - 1].split(' ').map(Number);
    const graph = {};
    const dist = [0];
    dist[v] = 0;
    const queue = [v];

    if (v === t) return 0;

    for (let i = 1; i <= n; i++) {
        graph[i] = [];
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === '1') graph[i + 1].push(j + 1);
        }
    }
    
    while (queue.length > 0) {
        const current = queue[0];
        queue.shift();

        for (let i = 0; i < graph[current].length; i++) {
            const vertex = graph[current][i];
            if (!dist[vertex]) {
                dist[vertex] = dist[current] + 1;
                queue.push(vertex);
            }
        }
    }

    return dist[t] ? dist[t] : -1;
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');
const result = solve(fileContent);
fs.writeFileSync('output.txt', result + '');
