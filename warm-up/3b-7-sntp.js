// 7. SNTP

// Ограничение времени 1 секунда
// Ограничение памяти 64Mb
// Ввод	стандартный ввод или input.txt
// Вывод стандартный вывод или output.txt

// Для того чтобы компьютеры поддерживали актуальное время, они могут обращаться к серверам точного 
// времени SNTP (Simple Network Time Protocol). К сожалению, компьютер не может просто получить время у 
// сервера, потому что информация по сети передаётся не мгновенно: пока сообщение с текущим временем дойдёт 
// до компьютера, оно потеряет свою актуальность. Протокол взаимодействия клиента (компьютера, запрашивающего 
// точное время) и сервера (компьютера, выдающего точное время) выглядит следующим образом:
// 1. Клиент отправляет запрос на сервер и запоминает время отправления A (по клиентскому времени).
// 2. Сервер получает запрос в момент времени B (по точному серверному времени) и отправляет клиенту сообщение, 
// содержащее время B.
// 3. Клиент получает ответ на свой запрос в момент времени C (по клиентскому времени) и запоминает его. Теперь 
// клиент, из предположения, что сетевые задержки при передаче сообщений от клиента серверу и от сервера клиенту 
// одинаковы, может определить и установить себе точное время, используя известные значения A, B, C.
// Вам предстоит реализовать алгоритм, с точностью до секунды определяющий точное время для установки на клиенте 
// по известным A, B и C. При необходимости округлите результат до целого числа секунд по правилам арифметики 
// (в меньшую сторону, если дробная часть числа меньше 1/2, иначе в большую сторону).
// Возможно, что, пока клиент ожидал ответа, по клиентскому времени успели наступить новые сутки, однако известно, 
// что между отправкой клиентом запроса и получением ответа от сервера прошло менее 24 часов.

// Формат ввода
// Программа получает на вход три временные метки A, B, C, по одной в каждой строке. Все временные метки 
// представлены в формате «hh:mm:ss», где «hh» – это часы, «mm» – минуты, «ss» – секунды. Часы, минуты и секунды 
// записываются ровно двумя цифрами каждое (возможно, с дополнительными нулями в начале числа).

// Формат вывода
// Программа должна вывести одну временную метку в формате, описанном во входных данных, – вычисленное точное время 
// для установки на клиенте. В выводе не должно быть пробелов, пустых строк в начале вывода.

function solve(input) {
    const [a, b, c] = input.toString().trim().split('\n')
        .map(el => {
            const arr = el.split(':');
            const h = Number(arr[0]) * 60 * 60;
            const m = Number(arr[1]) * 60;
            const c = Number(arr[2]);
            return h + m + c;
        });

    const diff = c > a ? (c - a) / 2 : (86400 - a + c) / 2;
    const time = b + diff;
    let t = time < 86400 ? time : time - 86400;
    let h = Math.floor(t / 3600);
    let m = Math.floor((t - (h * 3600)) / 60);
    let s = Math.round(t - (h * 3600) - (m * 60));

    if (s === 60) {
        s = 0;
        m = m + 1;
    }

    if (m === 60) {
        m = 0;
        h = h + 1;
    }
    
    return `${h > 9 ? h : `0${h}`}:${m > 9 ? m : `0${m}`}:${s > 9 ? s : `0${s}`}`;
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');
const result = solve(fileContent);
fs.writeFileSync('output.txt', result + '');
