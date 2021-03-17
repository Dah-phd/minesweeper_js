class draw_mine {
    constructor(field, mine_field) {
        console.log(field)
        this.grid = document.getElementById(field);
        this.cvs = this.grid.getContext('2d');
        this.game = mine_field;
        this.boxes();
        this.clicker();
    }
    boxes() {
        this.cvs.clearRect(0, 0, this.grid.width, this.grid.height)
        for (let row = 0; row < 16; row++) {
            for (let cell = 0; cell < 30; cell++) {
                if (this.game.field[row][cell][1] == 0) {
                    if (this.game.field[row][cell][2] == 1) { this.cvs.fillStyle = 'green' }
                    else { this.cvs.fillStyle = 'gray' }
                    this.cvs.fillRect(40 * cell, 40 * row, 39, 39)
                }
                else {
                    this.cvs.font = '30px Bold Courier New'
                    let value = this.game.field[row][cell][0]
                    if (value == 0) { continue }
                    else if (value == 'M') { this.cvs.fillStyle = 'red'; this.cvs.fillText(value, 40 * cell + 5, 40 * row + 30); continue }
                    else if (value == 1) { this.cvs.fillStyle = 'green' }
                    else if (value == 2) { this.cvs.fillStyle = 'blue' }
                    else if (value == 3) { this.cvs.fillStyle = 'red' }
                    else { this.cvs.fillStyle = 'black' }
                    this.cvs.fillText(value, 40 * cell + 10, 40 * row + 30)
                }
            }
        }

    }
    getposition(event) {
        let cell = Math.floor(event.layerX / 40);
        let row = Math.floor(event.layerY / 40);
        console.log(event.which)
        if (event.which == 1) { this.game.onclick(row, cell) }
        else if (event.which == 3) { this.game.lock(row, cell) }
        this.boxes()

    }
    clicker() {
        this.grid.addEventListener('mousedown', this.getposition.bind(this))
    }
}

