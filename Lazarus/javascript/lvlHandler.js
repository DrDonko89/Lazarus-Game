//example lvlString: "0,0|5,9|7,10"
//                  0x,0y|5x,9y|7x,10y
var testLvl = "1,4|2,5|3,6|4,7|5,8|6,9|7,10|8,11|9,12";

function setupLvl(lvlString_) {
    if(!lvlString_) return;
    var cors = lvlString_.split("|");
    for(var i = 0; i < cors.length; i++) {
        var c = cors[i];
        if(c.charAt(0) === ":") {
            let l = c.substr(1);
            let lx = parseInt(l.split(",")[0]);
            let ly = parseInt(l.split(",")[1]);
            lazarus.gridPos = getGridPos(lx, ly, 62);
            return;
        }
        var x = parseInt(c.split(",")[0]);
        var y = parseInt(c.split(",")[1]);

        var pos = getGridPos(x, y, 62);
        boxes.push(new Box(pos.x, pos.y, 62, wall, pos, "wall"));
    }
}

function reset() {
    boxes = [];
    selecteer("#lvlStr").value = "";
    setWalls();
    lazarus = new Lazarus(laz_startPos, 62);
    clearInterval(spawnBoxTimer);
    spawnBoxTimer = setInterval(createBox, 1701);
    setupLvl(lvlString);
}

function importLvl() {
    let newLvlStr = selecteer("#lvlStr").value;
    if(!newLvlStr) return;
    lvlString = newLvlStr;
    reset();
    setupLvl(newLvlStr);
}