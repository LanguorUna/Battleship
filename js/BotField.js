class BotField extends Field {
    /**
     * Отрисовка поля
     */
    drawField() {
        const UserField = document.querySelector('.field__Bot');
        let rows = '';

        for (let i = 0; i < 10; i++) {
            rows += `<tr class="field__row ${(i % 2) == 0 ? 'field__row__even' : ''}">`;
            for (let j = 0; j < 10; j++) {

                rows += '<td><div class="ship ship__type-0 ship__field"></div></td>';
            }
            rows += '</tr>'
        }
        UserField.innerHTML = rows;
    }
}