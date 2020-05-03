class Ship {
    /**
     * 
     * @param {*} type - размерность корабля
     */
    constructor(type) {
        this.type = type < 1 ? 1 : type;
        this.startX = 0;
        this.startY = 0;
        this.shootcounter = 0;
        this.status = true;

        this.endX = this.startX + type - 1;
        this.endY = 0;
    }

    /**
     * Задаём координаты коробля на поле
     * @param {*} startX 
     * @param {*} startY 
     * @param {*} direction 
     */
    setPosition(startX, startY, direction) {
        this.startX = startX;
        this.startY = startY;

        if (direction == 'vertical') {
            this.endX = this.startX + this.type - 1;
            this.endY = startY;
        }

        if (direction == 'horizontal') {
            this.endX = this.startX;
            this.endY = this.startY + this.type - 1;
        }
    }

    /**
     * Определение направления корабля
     */
    get direction() {
        if (this.startX != this.endX) {
            return 'vertical'
        }

        if (this.startY != this.endY) {
            return 'horizontal'
        }
        return 'horizontal'
    }

    /**
     * Проверка выстрела
     * @param {*} shootX 
     * @param {*} shootY 
     */
    сheckShoot(shootX, shootY) {
        if (this.сheckСoordinates(shootX, shootY)) {
            this.сheckDeath();
            return true;
        }
        return false;
    }

    /**
     * Проверка на уничтожение
     */
    сheckDeath() {
        this.shootcounter += 1;
        if (this.shootcounter == this.type) {
            this.status = false;
            return true;
        }
        return false;
    }

    /**
     * Проверка входящих координат
     * @param {*} x 
     * @param {*} y 
     */
    сheckСoordinates(x, y) {

        if (this.direction == 'horizontal') {
            if ((y >= this.startY) && (y <= this.endY) && (x == this.startX)) {
                return true;
            }
        }

        if (this.direction == 'vertical') {
            if ((x >= this.startX) && (x <= this.endX) && (y == this.startY)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Отрисовка
     * @param {*} table 
     */
    draw(table) {
        for (let i = this.startX; i <= this.endX; i++) {
            for (let j = this.startY; j <= this.endY; j++) {
                table.rows[i].cells[j].innerHTML = this.render();
            }
        }
    }

    /**
     * Рендер ячейки корабля
     */
    render() {
        return `<div class="ship ship__type-${this.type}"></div>`;
    }
}