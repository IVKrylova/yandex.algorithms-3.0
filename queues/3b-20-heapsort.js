/* 20. Пирамидальная сортировка
Ограничение времени	2 секунды
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt
Отсортируйте данный массив. Используйте пирамидальную сортировку.

Формат ввода
Первая строка входных данных содержит количество элементов в массиве N, N ≤ 105. Далее задаются N целых чисел, не превосходящих по абсолютной величине 109.

Формат вывода
Выведите эти числа в порядке неубывания.

Пример 1
Ввод	Вывод
1
1
1 
Пример 2
Ввод	Вывод
2
3 1
1 3  */

function solve(input) {
    const data = input.toString().trim().split('\n');
    let n = +data[0];
    const arr = data[1].split(' ').map(Number)
    
    if (n === 0) return '';

    let initInd = Math.floor(n / 2);
    let currentInd, leftInd, currentEl = null;

    while (true) {
        if (initInd > 0) {
            currentEl = arr[--initInd];
        } else {
            n--;
            if (n === 0) return arr.join(' ');
            currentEl = arr[n]; 
            arr[n] = arr[0];
        }

        currentInd = initInd;
        leftInd = currentInd * 2 + 1;
        
        while (leftInd < n) {
            if (leftInd + 1 < n && arr[leftInd + 1] > arr[leftInd]) leftInd++;
            if (arr[leftInd] > currentEl) { 
                arr[currentInd] = arr[leftInd]; 
                currentInd = leftInd; 
                leftInd = currentInd * 2 + 1;
            } else {
                break;
            }
        }
        arr[currentInd] = currentEl;
    }
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');
const result = solve(fileContent);
fs.writeFileSync('output.txt', result + '');
