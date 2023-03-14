// 19. Хипуй

// Ограничение времени 2 секунды
// Ограничение памяти 64Mb
// Ввод	стандартный ввод или input.txt
// Вывод стандартный вывод или output.txt

// В этой задаче вам необходимо самостоятельно (не используя соответствующие классы и функции стандартной библиотеки) 
// организовать структуру данных Heap для хранения целых чисел, над которой определены следующие операции: 
// a) Insert(k) – добавить в Heap число k ; b) Extract достать из Heap наибольшее число (удалив его при этом).

// Формат ввода
// В первой строке содержится количество команд N (1 ≤ N ≤ 100000), далее следуют N команд, каждая в своей строке. 
// Команда может иметь формат: “0 <число>” или “1”, обозначающий, соответственно, операции Insert(<число>) и Extract. 
// Гарантируется, что при выполенении команды Extract в структуре находится по крайней мере один элемент.

// Формат вывода
// Для каждой команды извлечения необходимо отдельной строкой вывести число, полученное при выполнении команды Extract.

function solve(input) {
    const data = input.toString().trim().split('\n');
    const n = +data[0];
    const instructions = data.slice(1).map(el => el.split(' ').map(Number));
    const heap = new MaxHeap();
    const res = [];

    for (let i = 0; i < n; i++) {
         if (i === 5315) debugger;
        if (instructions[i][0] === 0) {
            heap.insert(instructions[i][1]);
        } else if (instructions[i][0] === 1) {
            res.push(heap.extract());
        }
    }

    console.log(res.join('\n'));
}

class MaxHeap {
    constructor() {
      this.heap = []
    }
  
    insert(node) {
        this.heap.push(node);
  
        if (this.heap.length > 1) {
            let current = this.heap.length - 1;
            this._swapElements(current);
        }
    }

    _swapElements(current) {
        while (current > 0 && this.heap[Math.floor((current - 1) / 2)] < this.heap[current]) {
            [this.heap[Math.floor((current - 1) / 2)], this.heap[current]] = [this.heap[current], this.heap[Math.floor((current - 1) / 2)]];          
            current = Math.floor((current - 1) / 2);
        }
    }

    _swapAfterExtract(leftChildIndex, rightChildIndex, current) {
        while ((this.heap[leftChildIndex] || this.heap[leftChildIndex] === 0)
            && (this.heap[rightChildIndex] || this.heap[rightChildIndex] === 0) 
            && (this.heap[current] < this.heap[rightChildIndex] || this.heap[current] < this.heap[leftChildIndex])) {
                        
            if (this.heap[leftChildIndex] > this.heap[rightChildIndex]) {
                [this.heap[current], this.heap[leftChildIndex]] = [this.heap[leftChildIndex], this.heap[current]];
                current = leftChildIndex;
            } else {
                [this.heap[current], this.heap[rightChildIndex]] = [this.heap[rightChildIndex], this.heap[current]];
                current = rightChildIndex;
            }

            leftChildIndex = current * 2 + 1;
            rightChildIndex = current * 2 + 2;
        }

        return [leftChildIndex, rightChildIndex, current];
    }
  
    extract() {
        let largest = this.heap[0];
        if (this.heap.length > 2) {
            this.heap[0] = this.heap[this.heap.length - 1];
            this.heap.splice(this.heap.length - 1);
            if (this.heap.length === 3) {
                if (this.heap[0] < this.heap[1]) {
                    [this.heap[0], this.heap[1]] = [this.heap[1], this.heap[0]];
                }
                if (this.heap[0] < this.heap[2]) {
                    [this.heap[0], this.heap[2]] = [this.heap[2], this.heap[0]];
                }
                return largest;
            }
            let current = 0;
            let leftChildIndex = current * 2 + 1;
            let rightChildIndex = current * 2 + 2;
  
            const swap = this._swapAfterExtract(leftChildIndex, rightChildIndex, current);

            if (!this.heap[swap[1]] && this.heap[swap[0]] > this.heap[swap[2]]) {
                [this.heap[swap[0]], this.heap[swap[2]]] = [this.heap[swap[2]], this.heap[swap[0]]];

                current = 0;
                leftChildIndex = current * 2 + 1;
                rightChildIndex = current * 2 + 2;

                this._swapAfterExtract(leftChildIndex, rightChildIndex, current);
            }   
            
            if (this.heap.length === 2) {
                if (this.heap[1] > this.heap[0]) {
                    [this.heap[1], this.heap[0]] = [this.heap[0], this.heap[1]];
                }
            }
        } else if (this.heap.length === 2) {
            this.heap.splice(0, 1);
        } else {
            this.heap.length = 0;
            return largest;
        }
        
        return largest;
    }
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');
const result = solve(fileContent);
fs.writeFileSync('output.txt', result + '');
