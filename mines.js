function make_field() {
    var field = [];
    for (i = 0; i < 16; i++) {
        field.push([])
        for (j = 0; j < 30; j++) {
            field[i].push(0)
        }
    }
    console.log(field);
    return field
}

function pr() {
    console.log(field[0])
}