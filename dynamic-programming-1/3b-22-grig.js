// 22. Кузнечик
// Ограничение времени	1 секунда
// Ограничение памяти	64Mb
// Ввод	стандартный ввод или input.txt
// Вывод	стандартный вывод или output.txt
// У одного из студентов в комнате живёт кузнечик, который очень любит прыгать по клетчатой одномерной доске. Длина доски — N клеток. К его сожалению, он умеет прыгать только на 1, 2, …, k клеток вперёд.

// Однажды студентам стало интересно, сколькими способами кузнечик может допрыгать из первой клетки до последней. Помогите им ответить на этот вопрос.

// Формат ввода
// В первой и единственной строке входного файла записано два целых числа — N и k .

// Формат вывода
// Выведите одно число — количество способов, которыми кузнечик может допрыгать из первой клетки до последней.

// Пример
// Ввод	Вывод
// 8 2
// 21

function solve(input) {
    const data = input.toString().trim().split(' ');
    const n = +data[0];
    const k = +data[1];
    const memo = [0, 1, 1];

    for (let i = 3; i <= n; i++) {
        if (i <= k) {
            memo[i] = 2 * memo[i - 1];
        } else {
            memo[i] = 2 * memo[i - 1] - memo[i - 1 - k];
        }

    }

    return memo[n];
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');
const result = solve(fileContent);
fs.writeFileSync('output.txt', result + '');