class AbstractFactory{
    create(component, options){
        return new component(options);
    }
}
const factory = new AbstractFactory();

class Field {
    constructor(){
        this.field = [
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                ];
        this.ships = [];        
    }

    //определение ячейки для корабля
    setShipPosition(ship){

        let row = this.randomInteger(0, 9);
        let column = this.randomInteger(0, 9);
        let direction = false;

        if(this.field[row][column] == 0){

            direction =  this.сheckingLocation(ship.type,row,column);
            
            if(direction){
                ship.setPosition(row,column,direction);
            } else {
                this.setShipPosition(ship);
            }
        } else {
            this.setShipPosition(ship);
        }

    }

    //Проверка места для корабля
    сheckingLocation(type,row,column){
       
        const horizontal =  this.determineHorizontalDirection(row,column,type);
        if(horizontal)
            return 'horizontal';

        const vertical =   this.determineVerticalDirection(row,column,type);
        if(vertical)
            return 'vertical';

        return false;    

    }
    //Проврека положения корабля по столбцу 
    determineVerticalDirection(row,column,type){
        let length = row + type - 1;
        if(length > 9)
            return false;

        for (let i = row; i < length; i++) {
            if(this.field[i][column] != 0){
                return false; 
            }                       
        }

        if(this.checkBounds(row, column, row + type -1, column)){
            return true;
        } 
        
        return false;
    }

    checkBounds(startX,startY,endX,endY){
        startX -= 1;
        startY -= 1;

        endX += 1;
        endY += 1;

        if(startX < 0)
            startX = 0;

        if(startY < 0) 
            startY = 0;

        if( endX > 9) 
            endX = 9;

        if(endY > 9) 
            endY = 9;

        for (let i = startX; i <= endX; i++) {
            for (let j = startY; j <= endY; j++) {
                if( this.field[i][j] == 1){  
                    return false;
                }
            }
        }
        return true;

    }

    //Проврека положения корабля по строке 
    determineHorizontalDirection(row,column,type){
        let length = column + type - 1;
        if(length > 9)
            return false;
        for (let i = column; i < length; i++) {
            if(this.field[row][i] != 0){
                return false;
            }                        
        }
        if(this.checkBounds(row, column, row , column + type -1)){
            return true;
        } 
        
        return false;
    }
    //Разметка поля
    MarkeField(ship){

        let squareStartX = ship.startX;
        let squareStartY = ship.startY;

        let squareEndX = ship.endX;
        let squareEndtY = ship.endY;

        if(ship.startX > 0)
            squareStartX -= 1;

        if(ship.startY > 0) 
            squareStartY -= 1;

        if(ship.endX < 9) 
            squareEndX += 1;

        if(ship.endY < 9) 
            squareEndtY += 1;

        for (let i = squareStartX; i <= squareEndX; i++) {
                for (let j = squareStartY; j <= squareEndtY; j++) {
                    if( this.field[i][j] == 0){    
                        this.field[i][j] = 2;
                    }
                }
        }

        if(ship.direction == 'horizontal'){
            for (let i = ship.startY; i < (ship.startY + ship.type); i++){
                this.field[ship.startX][i] = 1;           
            }
        }

        if(ship.direction == 'vertical'){
            for (let i = ship.startX; i < (ship.startX + ship.type); i++){
                this.field[i][ship.startY] = 1;           
            }                
        }

        if(ship.type == 1){
            this.field[ship.startX][ship.startY] = 1;
        }  
       
    }
    //проверка выстрела на поле
    checkShotField(shotX,shotY){
        let status = false; 

        for (let i = 0; i < 10; i++) {
           if(this.ships[i].сheckShot(shotX,shotY)){
            
                status = this.ships[i].сheckShot(shotX,shotY) ;
           }
        }
        this.markingShot(status,shotX,shotY)  
        
    }
    //помечаем где был выстрел на поле
    markingShot(status,shotX,shotY){
        if(status){
            this.field[shotX][shotY] = 4;
        }
        else this.field[shotX][shotY] = 3;
    }
    //заполнение поля
    сompletion(){
        const typeShips = [4,3,3,2,2,2,1,1,1,1]
        for (let i = 0; i < 10; i++) {
            this.ships[i] = factory.create(Ship,typeShips[i]);
            this.setShipPosition(this.ships[i]);
            this.MarkeField(this.ships[i]);                    
        }

        console.log(this);
    }
    //приватный
    randomInteger(min, max) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
}

class UserField extends Field{

    drawField(){
        const UserField = document.querySelector('.UserField');
        let row = '';

        for (let i = 0; i < 10; i++) {
            row += '<tr>';

            for (let j = 0; j < 10; j++) {

                if(this.field[i][j] == 1){
                    row += `<td>${this.drawShips(i,j)}</td>`;
                }
                else {
                    row += `<td>${this.field[i][j]}</td>`;
                }
            }
            row += '</tr>' 
        }
        UserField.innerHTML = row;

    }
    drawShips(x,y){
        for (let i = 0; i < 10; i++) {
             if(this.ships[i].сheckСoordinates(x,y)){
                 return this.ships[i].drawShip();
             }
        }    
    
    }
}
class Ship {
    constructor(type) {
        this.type = type < 1 ? 1 : type;
        this.startX = 0;
        this.startY = 0;
        this.shotcounter = 0;
        this.status = true;

        this.endX = this.startX + type -1;
        this.endY = 0;
    }
    //задаём координаты коробля на поле
    setPosition(startX,startY,direction){
        this.startX = startX;
        this.startY = startY;

        if(direction == 'vertical'){
            this.endX = this.startX + this.type -1;
            this.endY = startY;
        }

        if(direction == 'horizontal'){
            this.endX = this.startX;
            this.endY = this.startY + this.type -1;
        }
    }
    //определение направления корабля
    get direction(){
        if(this.startX != this.endX){
            return 'vertical'
        }
        
        if(this.startY != this.endY){
            return 'horizontal'
        }
        return 'horizontal'
    }
    //проверка выстрела
    сheckShot(shotX,shotY){
        if(this.сheckСoordinates(shotX, shotY)){
            this.сheckDeath();
            return true;
        }
        return false;
    }
    //проверка на уничтожение
    сheckDeath(){
        this.shotcounter += 1;
        if(this.shotcounter == this.type){
            this.status = false;
            return true;
        }
        return false;
    }

    сheckСoordinates(x,y){

        if(this.direction == 'horizontal'){
            if((y >= this.startY) && (y <= this.endY) && (x == this.startX)){
                return true;
            }
        }

        if(this.direction == 'vertical'){
            if((x >= this.startX) && (x <= this.endX) && (y == this.startY)){
                return true;
            }
        }
        return false;
    }

    drawShip(){
        return `<div class="ship ship__type-${this.type}"></div>`;
    }
}
   
    let userField = new UserField();
    userField.сompletion();
    //userField.checkShotField(3,5);
    userField.drawField();