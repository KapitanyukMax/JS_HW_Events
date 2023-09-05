class Game {
    static count = 0;

    constructor(name, price, categoryId, releaseDate) {
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
        this.releaseDate = releaseDate;
        this.id = ++Game.count;
    }
}

const createBtn = document.querySelector('#create-btn');
const clearBtn = document.querySelector('#clear-btn');
const searchForm = document.querySelector("#searchForm");
const searchField = document.querySelector("#searchField");
const searchOptions = document.querySelector("#searchOptions");
const nameInput = document.querySelector('#nameInput');
const priceInput = document.querySelector('#priceInput');
const categoryInput = document.querySelector('#categoryInput');
const releaseDateInput = document.querySelector("#releaseDateInput");
const tableBody = document.querySelector('#games-table tbody');
const categories = [ "Singleplayer", "Local multiplayer", "Global multiplayer", "Mixed" ];

const games = [ new Game("Minecraft", 100, 4, "2009-05-17"), new Game("CS GO", 0, 3, "2012-08-21") ];

displayTable(games);

createBtn.onclick = () => {
    if (!nameInput.value || !priceInput.value || !categoryInput.value || !releaseDateInput.value) {
        alert("All fields are required, please enter any value");
        return;
    }
    let prod = new Game(nameInput.value, priceInput.value, categoryInput.value, releaseDateInput.value);
    games.push(prod);
    addGameToTable(prod);
};

clearBtn.onclick = () => {
    games.splice(0);
    tableBody.innerHTML = "";
};

searchForm.onsubmit = (event) => {
    event.preventDefault();
    let searchName = searchField.value;
    if (searchName.trim() === "") {
        displayTable(games);
    } else {
        const displayGames = [];
        for (let game of games) {
            if (game.name.toLowerCase().includes(searchName.toLowerCase())) displayGames.push(game);
        }
        displayTable(displayGames);
    }
}

searchField.oninput = () => {
    searchOptions.innerHTML = "";
    if (searchField.value.length >= 2) {
        for (let game of games) {
            if (game.name.toLowerCase().includes(searchField.value.toLowerCase())) {
                searchOptions.insertAdjacentHTML("beforeend", `<option value="${game.name}"/>`);
                console.log(searchOptions.children);
            }
        }
    }
}

function addGameToTable(game) {
    tableBody.insertAdjacentHTML("beforeend",
`<tr>
    <th scope="row">${game.id}</th>
    <td>${game.name}</td>
    <td>${game.price}$</td>
    <td>${categories[game.categoryId - 1]}</td>
    <td>${game.releaseDate}</td>
</tr>`);
}

function displayTable(displayGames) {
    tableBody.innerHTML = "";
    for (let game of displayGames) {
        addGameToTable(game);
    }
}