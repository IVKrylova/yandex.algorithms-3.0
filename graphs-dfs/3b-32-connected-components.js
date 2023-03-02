// 32. Компоненты связности
// Все языки	Python 3.6
// Ограничение времени	2 секунды	5 секунд
// Ограничение памяти	256Mb	256Mb
// Ввод	стандартный ввод или input.txt
// Вывод	стандартный вывод или output.txt
// Дан неориентированный невзвешенный граф. Необходимо посчитать количество его компонент связности и вывести их.

// Формат ввода
// Во входном файле записано два числа N и M (0 < N ≤ 100000, 0 ≤ M ≤ 100000). В следующих M строках записаны по два числа i и j (1 ≤ i, j ≤ N), которые означают, что вершины i и j соединены ребром.

// Формат вывода
// В первой строчке выходного файла выведите количество компонент связности. Далее выведите сами компоненты связности в следующем формате: в первой строке количество вершин в компоненте, во второй - сами вершины в произвольном порядке.

// Пример 1
// Ввод	Вывод
// 6 4
// 3 1
// 1 2
// 5 4
// 2 3
// 3
// 3
// 1 2 3 
// 2
// 4 5 
// 1
// 6 
// Пример 2
// Ввод	Вывод
// 6 4
// 4 2
// 1 4
// 6 4
// 3 6
// 2
// 5
// 1 2 3 4 6 
// 1
// 5 

function solve(input) {
    const data = input.toString().trim().split('\n');
    const [v, e] = data[0].split(' ').map(Number);
    const edge = data.slice(1).map(el => el.split(' '));
    const graph = {};
    const visited = {};
    const res = [new Array()];
    const stack = [];
    let components = 0;

    for (let i = 1; i <= v; i++) {
        graph[i] = [];
    }
    for (let i = 0; i < e; i++) {
        if (edge[i][0] !== edge[i][1]) {
            graph[edge[i][0]].push(edge[i][1]);
            graph[edge[i][1]].push(edge[i][0]);
        }
    }

    function dfs(start) {
        stack.push(start);
        visited[start] = true;
        res[start] = [];

        while (stack.length > 0) {
            const v = stack.shift();
            res[start].push(v);
            for (let node of graph[v]) {
                if (!visited[node]) {
                    stack.push(node);
                    visited[node] = true;
                }
            }
        }
    }

    for (let i = 1; i <= v; i++) {
        if (!visited[i]) {
            components++;
            dfs(i);
        }
    }

    const str = res.filter(el => el.length > 0).reduce((str, el) => str = str + `\n${el.length}\n${el.join(' ')}`, '');

    return `${components}${str}`;
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');
const result = solve(fileContent);
fs.writeFileSync('output.txt', result + '');
