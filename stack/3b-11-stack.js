// 11. Стек с защитой от ошибок

// Ограничение времени 1 секунда
// Ограничение памяти 64Mb
// Ввод	стандартный ввод или input.txt
// Вывод стандартный вывод или output.txt

// Научитесь пользоваться стандартной структурой данных stack для целых чисел. Напишите программу, 
// содержащую описание стека и моделирующую работу стека, реализовав все указанные здесь методы. 
// Программа считывает последовательность команд и в зависимости от команды выполняет ту или иную операцию. 
// После выполнения каждой команды программа должна вывести одну строчку. Возможные команды для программы:
// push n - Добавить в стек число n (значение n задается после команды). Программа должна вывести ok.
// pop - Удалить из стека последний элемент. Программа должна вывести его значение.
// back - Программа должна вывести значение последнего элемента, не удаляя его из стека.
// size - Программа должна вывести количество элементов в стеке.
// clear - Программа должна очистить стек и вывести ok.
// exit - Программа должна вывести bye и завершить работу.
// Перед исполнением операций back и pop программа должна проверять, содержится ли в стеке хотя бы один элемент. 
// Если во входных данных встречается операция back или pop, и при этом стек пуст, то программа должна вместо числового значения вывести строку error.

// Формат ввода
// Вводятся команды управления стеком, по одной на строке

// Формат вывода
// Программа должна вывести протокол работы стека, по одному сообщению на строке

const readline = require('readline');
 
const rl = readline.createInterface({
    input: process.stdin
});
 
let lines = [];
rl.on('line', (line) => {
    lines.push(line);
}).on('close', () => {
    const data = lines;
    const stack = [];
    let res = '';
    data.forEach(el => {
        if (el.slice(0, 4) === 'push') {
            const n = Number(el.split(' ')[1]);
            if (n || n === 0) stack.push(n);
            res = res + 'ok\n';
        } else if (el === 'back') {
            if (stack.length === 0) {
                res = res + 'error\n';
            } else {
                res = res + `${stack[stack.length - 1]}\n`;
            }
        } else if (el === 'size') {
            res = res + `${stack.length}\n`;
        } else if (el === 'pop') {
            if (stack.length === 0) {
                res = res + 'error\n';
            } else {
                const pop = stack.pop();
                res = res + `${pop}\n`;
            }
        } else if (el === 'clear') {
            stack.length = 0;
            res = res + 'ok\n';
        } else if (el === 'exit') {
            res = res + 'bye';
            process.stdout.write(res);
            process.exit(0);
        }
    });
});