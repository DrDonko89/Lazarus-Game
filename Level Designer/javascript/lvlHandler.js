function setupLvl(lvlString) {
    if(!lvlString) return;
    var cors = lvlString.split("|");
    for(var i = 0; i < cors.length; i++) {
        var x = parseInt(cors[i].split(",")[0]);
        var y = parseInt(cors[i].split(",")[1]);

        var pos = getGridPos(x, y, 62);
        boxes.push(new Box(pos, 62));
    }
}

function addToLvlString(gridX, gridY) {
    newLvl += gridX + "," + gridY + "|";
}

function returnNewLvl() {
    if(!finished) {
        alert("Zet Lazarus z'n start locatie!");
        finished = true;
        return;
    }
    // newLvl = newLvl.slice(0, -1);
    selecteer("#lvlStr").value = newLvl;
}

function reset() {
    boxes = [];
    selecteer("#lvlStr").value = "";
    newLvl = "";
}

function importLvl() {
    let newLvlStr = selecteer("#lvlStr").value;
    reset();
    setupLvl(newLvlStr);
}