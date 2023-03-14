// 13. Постфиксная запись

// Ограничение времени 1 секунда
// Ограничение памяти 256Mb
// Ввод	стандартный ввод или input.txt
// Вывод стандартный вывод или output.txt

// В постфиксной записи (или обратной польской записи) операция записывается после двух операндов. 
// Например, сумма двух чисел A и B записывается как A B +. Запись B C + D * обозначает привычное нам (B + C) * D, 
// а запись A B C + D * + означает A + (B + C) * D. Достоинство постфиксной записи в том, что она не требует скобок 
// и дополнительных соглашений о приоритете операторов для своего чтения.

// Формат ввода
// В единственной строке записано выражение в постфиксной записи, содержащее цифры и операции +, -, *. Цифры 
// и операции разделяются пробелами. В конце строки может быть произвольное количество пробелов.

// Формат вывода
// Необходимо вывести значение записанного выражения.

function solve(input) {
    const line = input.toString().trim().split(' ');
    const stack = [];
    
    for (let i = 0; i < line.length; i++) {
        const el = Number(line[i]);

        if (!isNaN(el)) {
            stack.push(el);
        } else if (line[i] === '+') {
            const a = stack.pop();
            const b = stack.pop();
            stack.push(b + a);
        } else if (line[i] === '-') {
            const a = stack.pop();
            const b = stack.pop();
            stack.push(b - a);
        } else if (line[i] === '*') {
            const a = stack.pop();
            const b = stack.pop();
            stack.push(b * a);
        }
    }
        
    return stack[0];
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');
const result = solve(fileContent);
fs.writeFileSync('output.txt', result + '');