/**
 * Инициализация игры
 * @param {*} event 
 */
function start(event) {
    const input = document.querySelector('.form-input');
    const form = document.querySelector('.form');


    const fieldUser = document.querySelector('.field__User');
    const fieldBot = document.querySelector('.field__Bot');

    const button = document.querySelector('.button__restart');

    if (input.value != '') {
        form.style.display = "none";
        fieldUser.style.display = "block";
        fieldBot.style.display = "block";

        button.style.display = "block";
        button.addEventListener("click", () => {
            game.prepareFields();
        })

        const game = new Game(fieldUser, fieldBot, document.querySelector('.name'), input.value);
        game.prepareFields();
    }
}
window.onload = () => {
    const button = document.querySelector('.button');
    button.addEventListener("click", start);
}


