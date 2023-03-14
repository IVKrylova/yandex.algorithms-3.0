// 24. Покупка билетов

// Ограничение времени 1 секунда
// Ограничение памяти 64Mb
// Ввод	стандартный ввод или input.txt
// Вывод стандартный вывод или output.txt

// За билетами на премьеру нового мюзикла выстроилась очередь из N человек, 
// каждый из которых хочет купить 1 билет. На всю очередь работала только одна касса, 
// поэтому продажа билетов шла очень медленно, приводя «постояльцев» очереди в отчаяние. 
// Самые сообразительные быстро заметили, что, как правило, несколько билетов в одни руки 
// кассир продаёт быстрее, чем когда эти же билеты продаются по одному. Поэтому они 
// предложили нескольким подряд стоящим людям отдавать деньги первому из них, чтобы он купил билеты на всех.
// Однако для борьбы со спекулянтами кассир продавала не более 3-х билетов в одни руки, поэтому договориться 
// таким образом между собой могли лишь 2 или 3 подряд стоящих человека.
// Известно, что на продажу i-му человеку из очереди одного билета кассир тратит Ai секунд, на продажу двух 
// билетов — Bi секунд, трех билетов — Ci секунд. Напишите программу, которая подсчитает минимальное время, 
// за которое могли быть обслужены все покупатели.
// Обратите внимание, что билеты на группу объединившихся людей всегда покупает первый из них. Также никто 
// в целях ускорения не покупает лишних билетов (то есть билетов, которые никому не нужны).

// Формат ввода
// На вход программы поступает сначала число N — количество покупателей в очереди (1 ≤ N ≤ 5000). 
// Далее идет N троек натуральных чисел Ai, Bi, Ci. Каждое из этих чисел не превышает 3600. Люди в 
// очереди нумеруются, начиная от кассы.

// Формат вывода
// Требуется вывести одно число — минимальное время в секундах, за которое могли быть обслужены все покупатели.

function solve(input) {
    const data = input.toString().trim().split('\n');
    const n = +data[0];
    const arr = data.slice(1).map(el => el.split(' ').map(Number));
    const dp = [];
    dp[1] = arr[0][0];

    if (n > 1) {
        dp[2] = Math.min(arr[0][0] + arr[1][0], arr[0][1]);
    }
    if (n > 2) {
        dp[3] = Math.min(dp[2] + arr[2][0], dp[1] + arr[1][1], arr[0][2]);
    }

    let i = 4;
    while (i <= n) {
        dp[i] = Math.min(dp[i - 1] + arr[i - 1][0], dp[i - 2] + arr[i - 2][1], dp[i - 3] + arr[i - 3][2]);
        i++;
    }

    return dp[n];
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');
const result = solve(fileContent);
fs.writeFileSync('output.txt', result + '');