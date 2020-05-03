class UserField extends Field {
    /**
     * Отрисовка поля
     */
    drawField() {
        const UserField = document.querySelector('.field__User');
        let rows = '';

        for (let i = 0; i < 10; i++) {
            rows += `<tr class="field__row ${(i % 2) == 0 ? 'field__row__even' : ''}">`;
            for (let j = 0; j < 10; j++) {

                rows += '<td><div class="ship ship__type-0"></div></td>';
            }
            rows += '</tr>'
        }
        UserField.innerHTML = rows;
        this.drawShips(UserField);

    }
    /**
     * Отрисовка кораблей
     * @param {*} table 
     */
    drawShips(table) {
        for (let i = 0; i < this.ships.length; i++) {
            this.ships[i].draw(table);
        }

    }
}