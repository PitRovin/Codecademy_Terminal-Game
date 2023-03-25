const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';





class Field {
    constructor(field = [[]]) {
        this._field = field;
        this.locationX = 0;
        this.locationY = 0;
        // Set the "home" position before the game starts
        this._field[0][0] = pathCharacter;
    }

    get field() {
        return this._field;
    }
    


    askQuestion() {
        const answer = prompt('Which way? ');
        switch (answer) {
            case 'w':
                this.locationY -= 1;
                break;
            case 'd':
                this.locationX += 1;
                break;
            case 's':
                this.locationY += 1;
                break;
            case 'a':
                this.locationX -= 1;
                break;
            default:
                console.log('Press w, s, d, a');
                this.askQuestion();
                break;
        
        }
    }

    isInBounds() {
        return (
            this.locationX >= 0 &&
            this.locationY >= 0 &&
            this.locationX <= this.field.length &&
            this.locationY <= this.field[0].length
        )
    }

    isHat() {
        return this.field[this.locationY][this.locationX] === hat;
    }

    isHole() {
        return this.field[this.locationY][this.locationX] === hole;
    }
    
    print() {
        for(let counter = 0; counter < this.field[0].length; counter++) {
            console.log(this.field[counter].join(""));
        }
        
    }

    playGame() {
        let playing = true;
        while(playing) {
            this.print();
            this.askQuestion();
            if (!this.isInBounds()) {
                console.log('Out of bounds instruction!');
                playing = false;
                break;
            } else if (this.isHole()) {
                console.log('Sorry, you fell down a hole!');
                playing = false;
                break;
            } else if (this.isHat()) {
                console.log('Congrats, you found your hat!');
                playing = false;
                break;
              }
              // Update the current location on the map
              this.field[this.locationY][this.locationX] = pathCharacter;
        }
    }
        




    static generateField(height, width, percentage = 0.1) {
        const field = new Array(height).fill(0).map(el => new Array(width));
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const prob = Math.random();
            field[y][x] = prob > percentage ? fieldCharacter : hole;
          }
        }
        // "hat" location
        const hatLocation = {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height)
        };
        // "hat" is not at the starting point
        while (hatLocation.x === 0 && hatLocation.y === 0) {
          hatLocation.x = Math.floor(Math.random() * width);
          hatLocation.y = Math.floor(Math.random() * height);
        }
        field[hatLocation.y][hatLocation.x] = hat;
        return field;
      }
}



   


const myfield = new Field(Field.generateField(20, 20, 0.2));
myfield.playGame();
