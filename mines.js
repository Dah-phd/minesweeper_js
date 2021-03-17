class mine_field {
    constructor() {
        this.reset()
    }
    reset() {
        this.alive = true;
        this.win = false;
        this.field = this._make_field();
        this._bombs_away();
        this._add_numbers();
    }
    boom() {
        this.alive = false;
        for (let row = 0; row < 16; row++) {
            for (let cell = 0; cell < 30; cell++) {
                if (this.field[row][cell][0] == 'M') {
                    this.field[row][cell] = ['M', 1, 0]
                }
            }
        }
    }
    ifwin() {
        this.alive = false;
        for (let row = 0; row < 16; row++) {
            for (let cell = 0; cell < 30; cell++) {
                if (this.field[row][cell][0] != 'M' && this.field[row][cell][1] == 0) { return }
            }
        }
        this.win = true
    }
    lock(row, cell) {
        if (this.field[row][cell][1] == 0) {
            if (this.field[row][cell][2] == 1) {
                this.field[row][cell] = [this.field[row][cell][0], 0, 0]
            } else {
                this.field[row][cell] = [this.field[row][cell][0], 0, 1]
            }
        }
    }
    getcurrent() {
        let now_field = [];
        for (let row = 0; row < 16; row++) {
            now_field.push([]);
            for (let cell = 0; cell < 30; cell++) {
                if (this.field[row][cell][1] == 1) {
                    now_field[row].push(this.field[row][cell][0])
                } else {
                    now_field[row].push(0)
                }
            }
        }
        return now_field
    }
    onclick(row, cell, limit = false) {
        if (this.alive) {
            if (this.field[row][cell][1] == 0 && this.field[row][cell][2] == 0) {
                this.field[row][cell] = [this.field[row][cell][0], 1, 0];
                if (this.field[row][cell][0] == 'M') {
                    this.boom()
                } else if (this.field[row][cell][0] == 0) { this._massclick(row, cell) }
            } else if (this.field[row][cell][1] == 1 && this.field[row][cell][0] != 0 && limit == false) {
                let locked = this._counter(row, cell, 2, 1);
                if (locked == this.field[row][cell][0]) {
                    if (this._counter(row, cell, 1, 0) - locked > 0) {
                        this._massclick(row, cell, limit = true)
                    }
                }
            }
        }
    }
    _massclick(row, cell, limit = false) {
        if (row != 0) { this.onclick(row - 1, cell, limit) };
        if (row != 15) { this.onclick(row + 1, cell, limit) };
        if (cell != 0) { this.onclick(row, cell - 1, limit) };
        if (cell != 29) { this.onclick(row, cell + 1, limit) };
        if (row != 0 && cell != 0) { this.onclick(row - 1, cell - 1, limit) };
        if (row != 15 && cell != 0) { this.onclick(row + 1, cell - 1, limit) };
        if (row != 0 && cell != 29) { this.onclick(row - 1, cell + 1, limit) };
        if (row != 15 && cell != 29) { this.onclick(row + 1, cell + 1, limit) }
    }

    _make_field() {
        var field = [];
        for (let row = 0; row < 16; row++) {
            field.push([])
            for (let cell = 0; cell < 30; cell++) {
                field[row].push([0, 0, 0])
            }
        }
        return field
    }
    _bombs_away() {
        let n = 99;
        while (n > 0) {
            let row = this._rand(16);
            let col = this._rand(30);
            if (this.field[row][col][0] == 0) {
                this.field[row][col] = ['M', 0, 0];
                n -= 1
            }
        }
    }
    _add_numbers() {
        for (let row = 0; row < 16; row++) {
            for (let cell = 0; cell < 30; cell++) {
                if (this.field[row][cell][0] == 0) {
                    this.field[row][cell] = [this._counter(row, cell), 0, 0]
                }
            }
        }
    }
    _rand(max) {
        return Math.floor(Math.random() * max)
    }
    prt() {
        console.log(this.field)
    }
    _counter(row, cell, location = 0, value = 'M') {
        let count = 0;
        if (row != 0 && this.field[row - 1][cell][location] == value) { count += 1 };
        if (row != 15 && this.field[row + 1][cell][location] == value) { count += 1 };
        if (cell != 0 && this.field[row][cell - 1][location] == value) { count += 1 };
        if (cell != 29 && this.field[row][cell + 1][location] == value) { count += 1 };
        if (row != 0 && cell != 0 && this.field[row - 1][cell - 1][location] == value) { count += 1 };
        if (row != 15 && cell != 0 && this.field[row + 1][cell - 1][location] == value) { count += 1 };
        if (row != 0 && cell != 29 && this.field[row - 1][cell + 1][location] == value) { count += 1 };
        if (row != 15 && cell != 29 && this.field[row + 1][cell + 1][location] == value) { count += 1 };
        return count
    }
}
