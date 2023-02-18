
// Ограничение времени	1 секунда
// Ограничение памяти	64Mb
// Ввод	стандартный ввод или input.txt
// Вывод	стандартный вывод или output.txt
// Лёша сидел на лекции. Ему было невероятно скучно. Голос лектора казался таким далеким и незаметным...

// Чтобы окончательно не уснуть, он взял листок и написал на нём свое любимое слово. Чуть ниже он повторил своё любимое слово, без первой буквы. Ещё ниже он снова написал своё любимое слово, но в этот раз без двух первых и последней буквы.

// Тут ему пришла в голову мысль — времени до конца лекции все равно ещё очень много, почему бы не продолжить выписывать всеми возможными способами это слово без какой-то части с начала и какой-то части с конца?

// После лекции Лёша рассказал Максу, как замечательно он скоротал время. Максу стало интересно посчитать, сколько букв каждого вида встречается у Лёши в листочке. Но к сожалению, сам листочек куда-то запропастился.

// Макс хорошо знает любимое слово Лёши, а ещё у него не так много свободного времени, как у его друга, так что помогите ему быстро восстановить, сколько раз Лёше пришлось выписать каждую букву.

// Формат ввода
// На вход подаётся строка, состоящая из строчных латинских букв — любимое слово Лёши.

// Длина строки лежит в пределах от 5 до 100 000 символов.

// Формат вывода
// Для каждой буквы на листочке Лёши, выведите её, а затем через двоеточие и пробел сколько раз она встретилась в выписанных Лёшей словах (см. формат вывода в примерах). Буквы должны следовать в алфавитном порядке. Буквы, не встречающиеся на листочке, выводить не нужно.

// Пример 1
// Ввод	Вывод
// hello
// e: 8
// h: 5
// l: 17
// o: 5
// Пример 2
// Ввод	Вывод
// abacaba
// a: 44
// b: 24
// c: 16

function solve(input) {
    const word = input.toString().trim().split('');
    const res = {};
    const arr = [];
    str = '';

    for (let i = 0; i < word.length; i++) {
        const n = (i + 1) * (word.length - i);
        res[word[i]] === undefined ? res[word[i]] = n : res[word[i]] = res[word[i]] + n;
    }

    for (let key in res) {
        arr.push([key, res[key]])
    }

    arr.sort()
    
    for (let i = 0; i < arr.length; i++) {
        str = str + `${arr[i][0]}: ${arr[i][1]}\n`
    }

    console.log(str)
    
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');
const result = solve(fileContent);
fs.writeFileSync('output.txt', result + '');