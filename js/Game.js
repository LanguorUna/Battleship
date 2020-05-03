class Game {
    /**
     * 
     * @param {*} userTable - контейнер поля игрока
     * @param {*} botTable - контейнер поля бота
     * @param {*} infoContainer - контейнер вывода информации
     * @param {*} name - имя игрока
     */
    constructor(userTable, botTable, infoContainer, name) {
        this.userField = new UserField();
        this.botField = new BotField();

        this.currentPlayer = 'user';

        this.userTable = userTable;
        this.botTable = botTable;

        this.infoContainer = infoContainer;
        this.name = name;
    }

    /**
     * Подготовка полей для начала игры
     */
    prepareFields() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.userField.clear();
        this.botField.clear();

        this.userField.сompletion();
        this.botField.сompletion();

        this.userField.drawField();
        this.botField.drawField();

        this.botTable.addEventListener("click", this.stepPlayer.bind(this));
        this.prepareStepPlayer();

        this.infoContainer.style.display = "block";
    }

    /**
     * Подготовка хода пользователя
     */
    prepareStepPlayer() {
        this.infoContainer.textContent = this.name + ", ваш ход!";
        this.botTable.classList.add("form-step");
        this.userTable.classList.remove("form-step");
        this.currentPlayer = "user";
    }

    /**
     * Подготовка хода бота
     */
    prepareStepBot() {
        this.infoContainer.textContent = "Ждите...";
        this.botTable.classList.remove("form-step");
        this.userTable.classList.add("form-step");
        this.currentPlayer = "bot";
    }

    /**
     * Ход бота
     */
    stepBot() {
        if (this.currentPlayer == 'bot') {
            this.shootBot();

            if (this.checkWin()) {
                return;
            }

            this.prepareStepPlayer();
        }
    }

    /**
     * Завершение игры
     */
    end() {
        if (this.currentPlayer == 'user') {
            this.winPlayer();
        }

        if (this.currentPlayer == 'bot') {
            this.winBot();
        }

        this.currentPlayer = 'none';
    }

    /**
     * Победил игрок
     */
    winPlayer() {
        this.infoContainer.textContent = this.name + ", вы победили!";
    }

    /**
     * Победил бот
     */
    winBot() {

        this.infoContainer.textContent = this.name + " вы проиграли!";
    }

    /**
     * Проверка завершения игры
     */
    checkWin() {
        const field = this.currentPlayer == 'user' ? this.botField : this.userField;
        if (!field.hasAlive()) {
            this.end();
            return true;
        }
        return false;
    }

    /**
     * Ход игрока
     * @param {*} event 
     */
    stepPlayer(event) {
        if (this.currentPlayer == 'user') {
            let ship = event.target
            let cell = ship.parentElement;
            if (cell.tagName.toLowerCase() != 'td')
                return;
            let i = cell.parentNode.rowIndex;
            let j = cell.cellIndex;

            if (this.botField.doShootField(i, j)) {
                this.botField.encircleDeadShips();
                this.botField.drawShoot(this.botTable);

                if (this.checkWin()) {
                    return;
                }

                this.prepareStepBot();
                this.timer = setTimeout(this.stepBot.bind(this), 2000);
            }
        }
    }

    /**
     * Выстрел бота
     */
    shootBot() {
        let x = Math.trunc(Math.random() * 10);
        let y = Math.trunc(Math.random() * 10);
        let count = 0;

        while (!this.userField.doShootField(x, y)) {
            x = Math.trunc(Math.random() * 10);
            y = Math.trunc(Math.random() * 10);
            count++;
            if (count > 100) {
                x++;
                if (x > 9) {
                    x = 0;
                    y++;

                    if (y > 9) {
                        y = 0;
                    }
                }
            }
        }
        this.userField.encircleDeadShips();
        this.userField.drawShoot(this.userTable);

    }
}