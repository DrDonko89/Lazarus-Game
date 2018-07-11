var cols = Math.floor((window.innerWidth - 124) / 62);
var rows = Math.floor((window.innerHeight - 124) / 62);
var bg, wall, stopImg, laz;
var canvas, ctx;
var boxes = [];
var stopbtns = [];
var newLvl = "";
var laz_loc = "";
var finished = false;

function selecteer(selector) {
    return document.querySelector(selector);
}

function setup() {
    canvas = createCanvas(cols * 62, rows * 62);
    canvas.parent("container");
    ctx = selecteer("#defaultCanvas0").getContext("2d");

    bg = selecteer("#bg");
    wall = selecteer("#wall");
    stopImg = selecteer("#stopImg");
    laz = selecteer("#laz");

    createGrid(62);
}

function draw() {
    ctx.drawImage(bg, 0, 0, width, height);

    createGrid(62);
    setWalls();

    for(var i = boxes.length - 1; i >= 0; i--) {
        boxes[i].show();
    }
    for(var i = stopbtns.length - 1; i >= 0; i--) {
        stopbtns[i].show();
    }
}

function setWalls() {
    for(let i = 4; i < rows; i++) {
        let posLeft = getGridPos(0, i, 62);
        let posRight = getGridPos(cols - 1, i, 62);
        boxes.push(new Box(posLeft, 62));
        boxes.push(new Box(posRight, 62));
    }

    let btnPosLeft = getGridPos(0, 3, 62);
    let btnPosRight = getGridPos(cols - 1, 3, 62);
    stopbtns.push(new StopBtn(btnPosLeft));
    stopbtns.push(new StopBtn(btnPosRight));
}

function mouseClicked() {
    if(mouseX > width || mouseX < 0 || mouseY > height || mouseY < 0) return;
    let newPos = makeGridPos(mouseX, mouseY, 62);
    if(newPos.gridX <= 0 || newPos.gridX >= cols - 1) return;
    if(finished) {
        newLvl += ":" + newPos.gridX + "," + newPos.gridY;
        boxes.push(new Lazarus(newPos));
        return;
    }
    boxes.push(new Box(newPos, 62));
    addToLvlString(newPos.gridX, newPos.gridY);
}