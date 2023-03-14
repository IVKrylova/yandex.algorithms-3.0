// 17. Игра в пьяницу

// Ограничение времени 1 секунда
// Ограничение памяти 64Mb
// Ввод	стандартный ввод или input.txt
// Вывод стандартный вывод или output.txt

// В игре в пьяницу карточная колода раздается поровну двум игрокам. Далее они вскрывают по одной верхней карте, 
// и тот, чья карта старше, забирает себе обе вскрытые карты, которые кладутся под низ его колоды. 
// Тот, кто остается без карт – проигрывает. Для простоты будем считать, что все карты различны по номиналу, 
// а также, что самая младшая карта побеждает самую старшую карту ("шестерка берет туза"). Игрок, который забирает 
// себе карты, сначала кладет под низ своей колоды карту первого игрока, затем карту второго игрока (то есть карта 
// второго игрока оказывается внизу колоды). Напишите программу, которая моделирует игру в пьяницу и определяет, 
// кто выигрывает. В игре участвует 10 карт, имеющих значения от 0 до 9, большая карта побеждает меньшую, карта 
// со значением 0 побеждает карту 9.

// Формат ввода
// Программа получает на вход две строки: первая строка содержит 5 чисел, разделенных пробелами — номера карт 
// первого игрока, вторая – аналогично 5 карт второго игрока. Карты перечислены сверху вниз, то есть каждая строка 
// начинается с той карты, которая будет открыта первой.

// Формат вывода
// Программа должна определить, кто выигрывает при данной раздаче, и вывести слово first или second, после чего 
// вывести количество ходов, сделанных до выигрыша. Если на протяжении 106 ходов игра не заканчивается, программа 
// должна вывести слово botva.

function solve(input) {
    const data = input.toString().trim().split('\n');
    const first = data[0].trim().split(' ').map(Number);
    const second = data[1].trim().split(' ').map(Number);
    let count = 0;

    while (count < 1000000){
        if (second.length - first.length === 10) {
            return `second ${count}`;
        } else if (first.length - second.length === 10) {
            return `first ${count}`;
        } else if (first[count] === 0 && second[count] === 9) {
            first.push(first[count]);
            first.push(second[count]);
            count++;
        } else if (first[count] === 9 && second[count] === 0) {
            second.push(first[count]);
            second.push(second[count]);
            count++;
        } else if (first[count] > second[count]) {
            first.push(first[count]);
            first.push(second[count]);
            count++;
        } else if (first[count] < second[count]) {
            second.push(first[count]);
            second.push(second[count]);
            count++;
        }
    }
  
   return `botva`;
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');
const result = solve(fileContent);
fs.writeFileSync('output.txt', result + '');