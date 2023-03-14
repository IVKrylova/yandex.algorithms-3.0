// A. Подземная доставка

// Ограничение времени 2 секунды
// Ограничение памяти 256Mb
// Ввод	стандартный ввод или input.txt
// Вывод стандартный вывод или output.txt

// Для ускорения работы служб доставки под городом Длинноградом был прорыт тоннель, по которому ходит 
// товарный поезд, останавливающийся на промежуточных станциях возле логистических центров. На станциях 
// к концу поезда могут быть присоединены вагоны с определенными товарами, а также от его конца может быть 
// отцеплено некоторое количество вагонов или может быть проведена ревизия, во время которой подсчитывается 
// количество вагонов с определенным товаром.
// Обработайте операции в том порядке, в котором они производились, и ответьте на запросы ревизии.

// Формат ввода
// В первой строке вводится число N (1 ≤ N ≤ 100000) — количество операций, произведенных над поездом.
// В каждой из следующих N строк содержится описание операций. Каждая операция может иметь один из трех типов:
// add <количество вагонов> <название товара> — добавить в конец поезда <количество вагонов> с грузом <название товара>. 
// Количество вагонов не может превышать 10^9, название товара — одна строка из строчных латинских символов длиной до 20.
// delete <количество вагонов> — отцепить от конца поезда <количество вагонов>. 
// Количество отцепляемых вагонов не превосходит длины поезда.
// get <название товара> — определить количество вагонов с товаром <название товара> в поезде. 
// Название товара — одна строка из строчных латинских символов длиной до 20.

// Формат вывода
// На каждый запрос о количестве вагонов с определенным товаром выведите одно число — количество вагонов 
// с таким товаром. Запросы надо обрабатывать в том порядке, как они поступали.

function solve(input) {
    const data = input.toString().trim().split('\n');
    const n = +data[0];
    const arr = data.slice(1).map(el => el.split(' '));
    const res = [];
    const stack = [];
    const set = {};

    for (let i = 0; i < n; i++) {
        if (arr[i][0] === 'add') {
            stack.push([arr[i][2], +arr[i][1]]);
            set[arr[i][2]] = true;
        } else if (arr[i][0] === 'get') {
            let count = 0;
            if (set[arr[i][1]] !== undefined) {
                count = stack.reduce((count, el) => {
                    if (el[0] === arr[i][1]) count = count + el[1];
                    return count;
                }, 0);
            }
            res.push(count);
        } else if (arr[i][0] === 'delete') {
            let d = +arr[i][1];
            while (d > 0) {
                const el = stack.pop();
                if (el[1] <= d) {
                    d = d - el[1];
                } else {
                    stack.push([el[0], el[1] - d]);
                    d = 0;
                }
            }
        }
    }

    return res.join('\n');
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');
const result = solve(fileContent);
fs.writeFileSync('output.txt', result + '');
