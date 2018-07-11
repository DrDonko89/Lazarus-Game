var canvas, w, h, ctx;
var cols = Math.floor((window.innerWidth - 124) / 62);
var rows = Math.floor((window.innerHeight - 124) / 62);
var bg, card, wood, metal, stone, wall;
var laz, laz_splat, laz_startPos;
var stopbtns = [], stopImg, stopped;
var boxes = [];
var spawnBoxTimer = setInterval(createBox, 1001);
var types = [];
var typeStrings = ["card", "wood", "metal", "stone", "wall"];
var lazarus, canMove;
var lvlString = "";

function selecteer(selector) {
    return document.querySelector(selector);
}

function setup() {
    //Create the canvas   
    canvas = createCanvas(cols * 62, rows * 62);
    w = width;
    h = height;
    ctx = selecteer("#defaultCanvas0").getContext("2d");
    finishLineY = random(height / 4, height / 2);
    canvas.parent("container");

    //Load images
    bg = selecteer("#bg");
    card = selecteer("#card");
    wood = selecteer("#wood");
    metal = selecteer("#metal");
    stone = selecteer("#stone");
    wall = selecteer("#wall");
    stopImg = selecteer("#stopImg");
    types = [card, wood, metal, stone];

    //Load lazarus images/gifs
    laz = selecteer("#laz");
    laz_splat = selecteer("#laz_splat");
    laz_startPos = getGridPos(floor(cols / 2), 0, 62);

    //Create lazarus
    lazarus = new Lazarus(laz_startPos, 62);

    //Setup + create stop button
    setWalls();
    setupLvl();

    //Other setup things
    disableScroll();
    createGrid(62);
}

function draw() {
    ctx.drawImage(bg, 0, 0, width, height);
    // createGrid(62);
    for(let i = boxes.length - 1; i >= 0; i--) {
        boxes[i].update();
    }
    for(let i = stopbtns.length - 1; i >= 0; i--) {
        stopbtns[i].update();
    }
    document.querySelector("#defaultCanvas0").scrollIntoView();
    lazarus.update();
}

function createBox() {
    let pos = getGridPos(Math.floor(random(1, cols - 1)), 0, 62);
    let index = floor(random(types.length));
    canMove = true;
    boxes.push(new Box(pos.x, pos.y, 62, types[index], pos, typeStrings[index]));
}

function keyPressed() {
    if(keyCode === LEFT_ARROW) {
        lazarus.move("left");
    } else if(keyCode === RIGHT_ARROW) {
        lazarus.move("right");
    }
}

function setWalls() {
    for(let i = 4; i < rows; i++) {
        let posLeft = getGridPos(0, i, 62);
        let posRight = getGridPos(cols - 1, i, 62);
        boxes.push(new Box(posLeft.x, posLeft.y, 62, wall, posLeft, "wall"));
        boxes.push(new Box(posRight.x, posRight.y, 62, wall, posRight, "wall"));
    }

    let btnPosLeft = getGridPos(0, 3, 62);
    let btnPosRight = getGridPos(cols - 1, 3, 62);
    stopbtns.push(new StopBtn(btnPosLeft));
    stopbtns.push(new StopBtn(btnPosRight));
}