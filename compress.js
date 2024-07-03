const Top = 10;
const Max = 300;
const Bits_in = 9;
const Bits_out = 6;
const Zeroes = "000000000";
const Marker = 511; // Это будет разделителем, поскольку числа <=300, а 2^9 = 511

function toBits(numbers) {
    let s = "";
    numbers.push(Marker); // Добавляем заведомо больший элемент как признак конца массива
    numbers.map(v => s += (Zeroes + v.toString(2)).slice(-Bits_in));
    numbers.pop();
    return s;
}

function fromBits(string) {
    let a = [];
    for (let i = 0; i < string.length; i += Bits_in) {
        let char = string.substring(i, i + Bits_in);
        let number = parseInt(char, 2);
        if (number > Max) break; // Определяем конец массива по граничному значению
        // console.log(i, number);
        a.push(number);
    }
    return a;
}

function toChars(string) {
    let s = "";
    for (let i = 0; i < string.length; i += Bits_out) {
        let bin = string.substring(i, i + Bits_out);
        let char = String.fromCharCode(32 + parseInt(bin, 2)); // Начинаем с пробела (код 32)
        s += char;
        // console.log(i, char, bin);
    }
    return s;
}

function fromChars(string) {
    let s = "";
    for (let i = 0; i < string.length; i++) {
        let code = string.charCodeAt(i);
        let bin = (Zeroes + (code - 32).toString(2)).slice(-Bits_out)
        s += bin;
        // console.log(i, code, bin);
    }
    return s;
}

function check(description, array_in) {
    let compressed = toChars(toBits(array_in));
    console.log(description, ": [" + array_in.length + "]", array_in);
    console.log(compressed);
    let array_out = fromBits(fromChars(compressed));
    console.log("Совпадают:",
        array_in.length === array_out.length &&
        !array_in.some((v, i) => array_in[i] !== array_out[i])
    );

    let label = document.createElement("h4");
    label.innerHTML = description + ": [" + array_in.length + "]";
    let div = document.createElement("div");
    div.innerHTML = "<strong>Массив:</strong><br> [" + array_in + "]";
    let stream = document.createElement("code");
    stream.innerHTML = "<strong>Сжатая строка:</strong><br>" + compressed;
    let main = document.getElementById("main");
    main.appendChild(label)
    main.appendChild(div);
    main.appendChild(stream);
}

window.onload = () => {

    [50, 100, 500, 1000].map(v => {
        let array = [];
        for (let i = 0; i < v; i++) array[i] = 1 + Math.trunc(Math.random() * Max);
        check("Случайные", array);
    })

    {
        let array = [];
        for (let i = 0; i < 300; i++) {
            array[i * 3] = i;
            array[i * 3 + 1] = i;
            array[i * 3 + 2] = i;
        }
        check("По три каждого", array);
    }

    [1, 2, 3].map(v => {
        let array = [];
        let ten = Math.pow(10, v);
        for (let i = 0; i < 1000; i++) array[i] = ten + Math.trunc(Math.random() * ten);
        check("Длина каждого числа " + v, array);
    })

}