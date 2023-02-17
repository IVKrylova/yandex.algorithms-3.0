// 12. Правильная скобочная последовательность
// Ограничение времени	1 секунда
// Ограничение памяти	64Mb
// Ввод	стандартный ввод или input.txt
// Вывод	стандартный вывод или output.txt
// Рассмотрим последовательность, состоящую из круглых, квадратных и фигурных скобок. Программа дожна определить, является ли данная скобочная последовательность правильной. Пустая последовательность явлется правильной. Если A – правильная, то последовательности (A), [A], {A} – правильные. Если A и B – правильные последовательности, то последовательность AB – правильная.

// Формат ввода
// В единственной строке записана скобочная последовательность, содержащая не более 100000 скобок.

// Формат вывода
// Если данная последовательность правильная, то программа должна вывести строку yes, иначе строку no.

// Пример 1
// Ввод	Вывод
// ()[]
// yes
// Пример 2
// Ввод	Вывод
// ([)]
// no
// Пример 3
// Ввод	Вывод
// (
// no

function solve(input) {
    const line = input.toString().trim().split('');
    const stack = [];

    if (line.length === 0) return 'yes';

    line.forEach(el => {
        if (el === '(' || el === '[' || el === '{') {
            stack.push(el);
        } else if (el === ')' && stack[stack.length - 1] === '(') {
            stack.pop();
        } else if (el === ')' && stack[stack.length - 1] !== '(') {
            stack.push(el);
        } else if (el === ']' && stack[stack.length - 1] === '[') {
            stack.pop();
        } else if (el === ']' && stack[stack.length - 1] !== '[') {
            stack.push(el);
        } else if (el === '}' && stack[stack.length - 1] === '{') {
            stack.pop();
        } else if (el === '}' && stack[stack.length - 1] !== '{') {
            stack.push(el);
        }
    });
    
    return stack.length === 0 ? 'yes' : 'no';
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');
const result = solve(fileContent);
fs.writeFileSync('output.txt', result + '');