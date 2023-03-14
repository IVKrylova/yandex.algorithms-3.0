// 31. Поиск в глубину

// Ограничение времени 2 секунды
// Ограничение памяти 256Mb
// Ввод	стандартный ввод или input.txt
// Вывод стандартный вывод или output.txt

// Дан неориентированный граф, возможно, с петлями и кратными ребрами. Необходимо построить компоненту связности, 
// содержащую первую вершину.

// Формат ввода
// В первой строке записаны два целых числа N (1 ≤ N ≤ 103) и M (0 ≤ M ≤ 5 * 105) — количество вершин и ребер в графе. 
// В последующих M строках перечислены ребра — пары чисел, определяющие номера вершин, которые соединяют ребра.

// Формат вывода
// В первую строку выходного файла выведите число K — количество вершин в компоненте связности. Во вторую строку 
// выведите K целых чисел — вершины компоненты связности, перечисленные в порядке возрастания номеров.

// рекурсия - TL на больших вводных
// function dfs(start) {
//     visited[start] = true;
//     for (let i = 0; i < graph[start].length; i++) {
//         const v = graph[start][i];
//         if (!visited[v]) dfs(graph[start][i]);
//     }
// }


function solve(input) {
    const data = input.toString().trim().split('\n');
    const [v, e] = data[0].split(' ').map(Number);
    const edge = data.slice(1).map(el => el.split(' '));
    const graph = {};
    const visited = {};
    const res = [];
    const stack = [];

    if (e === 0) return '1\n1';

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

        while (stack.length > 0) {
            const v = stack.shift();
            for (let node of graph[v]) {
                if (!visited[node]) {
                    stack.push(node);
                    visited[node] = true;
                }
            }
        }
    }

    dfs(1);

    for (let key in visited) {
        if (visited[key]) res.push(key);
    }
   
    res.sort((a, b) => a - b);
    
    return `${res.length}\n${res.join(' ')}`;
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');
const result = solve(fileContent);
fs.writeFileSync('output.txt', result + '');
