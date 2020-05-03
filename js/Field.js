class Field {
    constructor() {
        this.clear();
    }
    /**
     * Очистка поля
     */
    clear() {
        this.field = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        this.ships = [];
    }

    /**
     * Определение ячейки для корабля
     * @param {*} ship 
     */
    setShipPosition(ship) {

        let row = this.randomInteger(0, 9);
        let column = this.randomInteger(0, 9);
        let direction = false;

        if (this.field[row][column] == 0) {

            direction = this.сheckingLocation(ship.type, row, column);

            if (direction) {
                ship.setPosition(row, column, direction);
            } else {
                this.setShipPosition(ship);
            }
        } else {
            this.setShipPosition(ship);
        }

    }

    /**
     * Проверка места для корабля
     * @param {*} type 
     * @param {*} row 
     * @param {*} column 
     */
    сheckingLocation(type, row, column) {

        const horizontal = this.determineHorizontalDirection(row, column, type);
        if (horizontal)
            return 'horizontal';

        const vertical = this.determineVerticalDirection(row, column, type);
        if (vertical)
            return 'vertical';

        return false;

    }
    /**
     * Проврека положения корабля по столбцу
     * @param {*} row 
     * @param {*} column 
     * @param {*} type 
     */ 
    determineVerticalDirection(row, column, type) {
        let length = row + type - 1;
        if (length > 9)
            return false;

        for (let i = row; i < length; i++) {
            if (this.field[i][column] != 0) {
                return false;
            }
        }

        if (this.checkBounds(row, column, row + type - 1, column)) {
            return true;
        }

        return false;
    }
    /**
     * Проверка границ для будущего корабля
     * @param {*} startX 
     * @param {*} startY 
     * @param {*} endX 
     * @param {*} endY 
     */
    checkBounds(startX, startY, endX, endY) {
        startX -= 1;
        startY -= 1;

        endX += 1;
        endY += 1;

        if (startX < 0)
            startX = 0;

        if (startY < 0)
            startY = 0;

        if (endX > 9)
            endX = 9;

        if (endY > 9)
            endY = 9;

        for (let i = startX; i <= endX; i++) {
            for (let j = startY; j <= endY; j++) {
                if (this.field[i][j] == 1) {
                    return false;
                }
            }
        }
        return true;

    }

    /**
     * Проврека положения корабля по строке 
     * @param {*} row 
     * @param {*} column 
     * @param {*} type 
     */
    determineHorizontalDirection(row, column, type) {
        let length = column + type - 1;
        if (length > 9)
            return false;
        for (let i = column; i < length; i++) {
            if (this.field[row][i] != 0) {
                return false;
            }
        }
        if (this.checkBounds(row, column, row, column + type - 1)) {
            return true;
        }

        return false;
    }
    /**
     * Разметка поля
     * @param {*} ship 
     */
    MarkeField(ship) {

        const bounds = this.calcBoundsShip(ship);

        for (let i = bounds.startX; i <= bounds.endX; i++) {
            for (let j = bounds.startY; j <= bounds.endY; j++) {
                if (this.field[i][j] == 0) {
                    this.field[i][j] = 2;
                }
            }
        }

        if (ship.direction == 'horizontal') {
            for (let i = ship.startY; i < (ship.startY + ship.type); i++) {
                this.field[ship.startX][i] = 1;
            }
        }

        if (ship.direction == 'vertical') {
            for (let i = ship.startX; i < (ship.startX + ship.type); i++) {
                this.field[i][ship.startY] = 1;
            }
        }

        if (ship.type == 1) {
            this.field[ship.startX][ship.startY] = 1;
        }

    }

    /**
     * Произведение выстрела на поле
     * @param {*} shootX 
     * @param {*} shootY 
     */
    doShootField(shootX, shootY) {

        if (!this.isShooted(shootX, shootY)) {
            let status = false;

            for (let i = 0; i < 10; i++) {
                if (this.ships[i].сheckShoot(shootX, shootY)) {

                    status = true;
                    break;
                }
            }
            this.markingShoot(status, shootX, shootY);
            return true;
        }
        return false;
    }
    /**
     * Был ли произведен выстрел по данной ячейке
     * @param {*} x 
     * @param {*} y 
     */
    isShooted(x, y) {
        if ((this.field[x][y] == 4) || (this.field[x][y] == 3)) {
            return true;
        }
        return false;
    }

    /**
     * Метка выстрела на поле
     * @param {*} status 
     * @param {*} shootX 
     * @param {*} shootY 
     */
    markingShoot(status, shootX, shootY) {
        if (status) {
            this.field[shootX][shootY] = 4;
        }
        else this.field[shootX][shootY] = 3;
    }

    /**
     * Заполнение поля
     */
    сompletion() {
        const typeShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
        for (let i = 0; i < 10; i++) {
            this.ships[i] = new Ship(typeShips[i]);
            this.setShipPosition(this.ships[i]);
            this.MarkeField(this.ships[i]);
        }
    }

    /**
     * Остались ли не уничтоженные корабли
     */
    hasAlive() {
        for (let i = 0; i < this.ships.length; i++) {
            if (this.ships[i].status)
                return true;
        }
        return false;
    }

    /**
     * Возвращает целое случайное число
     * @param {*} min 
     * @param {*} max 
     */
    randomInteger(min, max) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    /**
     * Отрисовка выстрела на поле
     * @param {*} table 
     */
    drawShoot(table) {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (this.field[i][j] == 4) {
                    table.rows[i].cells[j].innerHTML = '<div class="ship ship__shoot__successful "></div>';
                }
                if (this.field[i][j] == 3) {
                    table.rows[i].cells[j].innerHTML = '<div class="ship ship__shoot"></div>';
                }
            }
        }
    }

    /**
     * Обводка уничтоженных кораблей
     */
    encircleDeadShips(){
        for (let i = 0; i < this.ships.length; i++) {
            if(!this.ships[i].status){
                this.encircleShip(this.ships[i]);
            }
            
        }
    }

    /**
     * Обводка корабля
     * @param {*} ship 
     */
    encircleShip(ship){
        const bounds = this.calcBoundsShip(ship);

        for (let i = bounds.startX; i <= bounds.endX; i++) {
            for (let j = bounds.startY; j <= bounds.endY; j++) {
                if(this.field[i][j] == 2)
                    this.field[i][j] = 3;
            }
            
        }
    }
    /**
     * Возвращает координаты обводки
     * @param {*} ship 
     */
    calcBoundsShip(ship){
        let squareStartX = ship.startX;
        let squareStartY = ship.startY;

        let squareEndX = ship.endX;
        let squareEndtY = ship.endY;

        if (ship.startX > 0)
            squareStartX -= 1;

        if (ship.startY > 0)
            squareStartY -= 1;

        if (ship.endX < 9)
            squareEndX += 1;

        if (ship.endY < 9)
            squareEndtY += 1;

        return {
            startX: squareStartX,
            startY: squareStartY,
            endX: squareEndX,
            endY: squareEndtY
        }
    }
}