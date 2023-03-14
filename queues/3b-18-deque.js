// 18. Дек с защитой от ошибок

// Ограничение времени 1 секунда
// Ограничение памяти 64Mb
// Ввод	стандартный ввод или input.txt
// Вывод стандартный вывод или output.txt

// Научитесь пользоваться стандартной структурой данных deque для целых чисел.  
// Напишите программу, содержащую описание дека и моделирующую работу дека, реализовав все 
// указанные здесь методы. Программа считывает последовательность команд и в зависимости от 
// команды выполняет ту или иную операцию. После выполнения каждой команды программа должна вывести одну строчку.
// Возможные команды для программы:
// push_front n - Добавить (положить) в начало дека новый элемент. Программа должна вывести ok.
// push_back n - Добавить (положить) в конец дека новый элемент. Программа должна вывести ok.
// pop_front - Извлечь из дека первый элемент. Программа должна вывести его значение.
// pop_back - Извлечь из дека последний элемент. Программа должна вывести его значение.
// front - Узнать значение первого элемента (не удаляя его). Программа должна вывести его значение.
// back - Узнать значение последнего элемента (не удаляя его). Программа должна вывести его значение.
// size - Вывести количество элементов в деке.
// clear - Очистить дек (удалить из него все элементы) и вывести ok.
// exit - Программа должна вывести bye и завершить работу.
// Гарантируется, что количество элементов в деке в любой момент не превосходит 100. 
// Перед исполнением операций pop_front, pop_back, front, back программа должна проверять, содержится 
// ли в деке хотя бы один элемент. Если во входных данных встречается операция pop_front, pop_back, front, 
// back, и при этом дек пуст, то программа должна вместо числового значения вывести строку error.

// Формат ввода
// Вводятся команды управления деком, по одной на строке.

// Формат вывода
// Требуется вывести протокол работы дека, по одному сообщению на строке

const readline = require('readline');
 
const rl = readline.createInterface({
    input: process.stdin
});
 
let lines = [];
rl.on('line', (line) => {
    lines.push(line);
}).on('close', () => {
    const data = lines;
    const deque = [];
    let res = '';
    data.forEach(el => {
        if (el.slice(0, 10) === 'push_front') {
            const n = Number(el.split(' ')[1]);
            if (n || n === 0) deque.unshift(n);
            res = res + 'ok\n';
        } else if (el.slice(0, 9) === 'push_back') {
            const n = Number(el.split(' ')[1]);
            if (n || n === 0) deque.push(n);
            res = res + 'ok\n';
        } else if (el === 'front') {
            if (deque.length === 0) {
                res = res + 'error\n';
            } else {
                res = res + `${deque[0]}\n`;
            }
        } else if (el === 'back') {
            if (deque.length === 0) {
                res = res + 'error\n';
            } else {
                res = res + `${deque[deque.length - 1]}\n`;
            }
        } else if (el === 'size') {
            res = res + `${deque.length}\n`;
        } else if (el === 'pop_front') {
            if (deque.length === 0) {
                res = res + 'error\n';
            } else {
                const shift = deque.shift();
                res = res + `${shift}\n`;
            }
        } else if (el === 'pop_back') {
            if (deque.length === 0) {
                res = res + 'error\n';
            } else {
                const pop = deque.pop();
                res = res + `${pop}\n`;
            }
        } else if (el === 'clear') {
            deque.length = 0;
            res = res + 'ok\n';
        } else if (el === 'exit') {
            res = res + 'bye';
            process.stdout.write(res);
            process.exit(0);
        }
    });
});