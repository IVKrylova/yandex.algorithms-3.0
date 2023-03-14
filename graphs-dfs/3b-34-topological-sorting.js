// 34. Топологическая сортировка

// Ограничение времени 2 секунды
// Ограничение памяти 256Mb
// Ввод	стандартный ввод или input.txt
// Вывод стандартный вывод или output.txt

// Дан ориентированный граф. Необходимо построить топологическую сортировку.

// Формат ввода
// В первой строке входного файла два натуральных числа N и M (1 ≤ N, M ≤ 100 000) — 
// количество вершин и рёбер в графе соответственно. Далее в M строках перечислены рёбра графа. 
// Каждое ребро задаётся парой чисел — номерами начальной и конечной вершин соответственно.

// Формат вывода
// Выведите любую топологическую сортировку графа в виде последовательности номеров вершин 
// (перестановка чисел от 1 до N). Если топологическую сортировку графа построить невозможно, выведите -1.

// рекурсия - переполнение на больших вводных 
// function dfs(start) {
//     if (graph[start].length > 0) visited[start] = 1;
//     for (let i = 0; i < graph[start].length; i++) {
//         const v = graph[start][i];
//         if (visited[v] === 1) flag = true;
//         if (visited[v] === 0) {
//             dfs(v); 
//         }
//     }
//     visited[start] = 2;
//     res.push(start);
// }

function solve(input) {
    const data = input.toString().trim().split('\n');
    const [v, e] = data[0].split(' ').map(Number);
    const edge = data.slice(1).map(el => el.split(' '));
    const graph = {};
    const indegreeGraph = {};
    const res = [];
    const freeV = [];
    const indegree = [];

    for (let i = 1; i <= v; i++) {
        indegreeGraph[i] = [];
    }
    for (let i = 0; i < e; i++) {
        if (!indegreeGraph[edge[i][1]]) {
            indegreeGraph[edge[i][1]] = [];
        }
        indegreeGraph[edge[i][1]].push(edge[i][0]);
    }
    for (let key in indegreeGraph) {
        indegree[key] = indegreeGraph[key].length;
        if (indegreeGraph[key].length === 0) freeV.push(key);
    }

    for (let i = 1; i <= v; i++) {
        graph[i] = [];
    }
    for (let i = 0; i < e; i++) {
        if (!graph[edge[i][0]]) {
            graph[edge[i][0]] = [];
        }
        graph[edge[i][0]].push(edge[i][1]);
    }

    if (freeV.length === 0) return -1;
    
    while (freeV.length > 0) {
        const node = freeV.pop();
        res.push(node);

        for (let i = 0; i < graph[node].length; i++) {
            const v = graph[node][i];
            indegree[v] = indegree[v] - 1;
            if (indegree[v] === 0) freeV.push(v);
        }
    }

    return res.length < v ? -1 : res.join(' ');
   
}
  
const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');
const result = solve(fileContent);
fs.writeFileSync('output.txt', result + '');
