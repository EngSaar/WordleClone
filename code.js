let count = 0;
let retry = 0;
let score = 0;
let word;
let url = "https://random-word-api.herokuapp.com/word?length=5";

let guessedWord = "";

const el = document.querySelectorAll(".zone");
const congratz = document.getElementsByClassName("congratz")[0];

async function init() {
    let promise = await fetch(url).catch(e => "Failed");
    let json = await promise.json();
    word = json[0];
    word = word.toUpperCase()
    console.log(word)
}

function hide() {
    congratz.style.visibility = "hidden";
    restart();
}

function guess(palavra) {
    let a = guessedWord === word ? true : false;
    for (let i = 0; i < guessedWord.length; i++) {
        if (guessedWord[i] === word[i]) {
            el[i + retry * 5].style.backgroundColor = "green";
            score += 65 - 5 * retry - 2 * (retry * retry);
        } else if (String(word).includes(guessedWord[i])) {
            el[i + retry * 5].style.backgroundColor = "yellow";
            score += 19 - (retry * retry + 1) * 2 - 5 * retry;
        }
    }
    guessedWord = "";
    ++retry;
    return a;
}

function validateChar(example) {
    return /^[a-zA-Z]$/g.test(example)
}

function wordBuild(char) {
    if (validateChar(char)) {
        let upper = String(char).toUpperCase();
        el[count].innerText = upper;
        guessedWord += upper;
        count++;
        if (guessedWord.length === 5) {
            return guess(guessedWord);
        }
    }
    return false;
};

function main(char) {

    let winner = wordBuild(char)
    if (winner) {
        score *= (6 - retry)
        congratz.innerHTML = `<header><button onclick="hide()">X</button></header><p>Congratulations! You discovered the word: ${word}.</p><p>${score}</p><footer></footer>`;
        congratz.style.visibility = "visible";
    }
    else {
        if (retry > 4) {
            congratz.innerHTML = `<header><button onclick="hide()">X</button></header><p>You Loose! You didn't discovered the word: ${word}</p><p>${score}</p><footer></footer>`;
            congratz.style.visibility = "visible";
        };
    }
}

document.addEventListener('keydown', event => {
    main(event.key);
}, false);

let offlineList = ["anime", "blood", "slick", "morro", "tungs", "towie", "yurts", "lehrs", "muras", "garni", "whins", "amort", "stele", "daubs", "mojos", "windy", "vices", "zoons", "curds", "rimed", "bonze", "sebum", "anils", "auras", "curry", "posts", "splay", "soupy", "fixer", "froes", "spode", "layed", "xerus", "gaits", "vivid", "decay", "roust", "myrrh", "apish", "ouzos", "sabin", "torus", "sunny", "kiddo", "ridge", "retag", "apeek", "sedan", "punts", "cholo", "tikka", "bubus", "leses", "rebid", "charr", "toxin", "mates", "stony", "silky", "soddy", "glads", "sodas", "fifth", "jetty", "gloat", "serve", "ragee", "udons", "pursy", "liker", "papas", "monks", "sooey", "dorky", "gyral", "basil", "syren", "suers", "coaly", "sepal", "ewers", "butle", "yukky", "pubic", "roshi", "gazes", "favus", "dogma", "cupel", "impel", "swear", "sappy", "neume", "aurar", "vampy", "lapis", "phuts", "merls", "hadst", "traik"]

init().catch(e => { console.log("failed"); word = (offlineList[Math.ceil(100 * Math.random()) - 1]).toUpperCase(); console.log(word) });

function restart() {
    init().catch(e => { console.log("failed"); word = (offlineList[Math.ceil(100 * Math.random()) - 1]).toUpperCase(); console.log(word) });
    el.forEach(i => {
        i.innerText = "";
        i.style.backgroundColor = "rgb(238, 236, 236)";
    });
    setTimeout(() => score = count = retry = 0, 100);
}
