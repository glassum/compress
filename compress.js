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
    let array_out = fromBits(fromChars(compressed));
    console.log("Совпадают:",
        array_in.length === array_out.length &&
        !array_in.some((v, i) => array_in[i] !== array_out[i])
    );

    let h3 = document.createElement("h3");
    h3.innerHTML = description + " [" + array_in.length + "]:";
    let div = document.createElement("div");
    div.innerHTML = /*"<h4>Source array:</h4> */"[" + array_in + "]";
    let h4 = document.createElement("h4");
    h4.innerHTML = "<h4>Compressed length: " + compressed.length + "</h4>";
    let p = document.createElement("p");
    p.innerText = compressed;
    let main = document.getElementById("main");
    main.appendChild(h3)
    main.appendChild(div);
    main.appendChild(p);
    main.appendChild(h4)
}

window.onload = () => {

    [50, 100, 500, 1000].map(v => {
        let array = [];
        for (let i = 0; i < v; i++) array[i] = 1 + Math.trunc(Math.random() * Max);
        check("Random from 1 to 1000", array);
    })

    {
        let array = [];
        for (let i = 0; i < 300; i++) {
            array[i * 3] = i;
            array[i * 3 + 1] = i;
            array[i * 3 + 2] = i;
        }
        check("Three of a kind", array);
    }

    [1, 2, 3].map(v => {
        let array = [];
        let one = Math.pow(10, (v - 1));
        let ten = Math.pow(10, (v + 0)) - one;
        for (let i = 0; i < 1000; i++) array[i] = one + Math.trunc(Math.random() * ten);
        check("Random from " + one + " to " + (ten + one - 1), array);
    })

}