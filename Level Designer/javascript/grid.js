function createGrid(size) {
    var curX = size;
    var curY = size;
    while(curX < width) {
        stroke(255, 90);
        line(curX, 0, curX, height);
        curX += size;
    }
    while(curY < height) {
        stroke(255, 90);
        line(0, curY, width, curY);
        curY += size;
    }
}

function getGridPos(gridX, gridY, size) {
    var xPos = gridX * size;
    var yPos = gridY * size;
    if(xPos % size != 0 || yPos % size != 0) {
        console.log("Can't pick a grid position.");
        return;
    } else {
        return {
            x: xPos,
            y: yPos,
            gridY: gridY,
            gridX: gridX
        }
    }
}

function makeGridPos(x_, y_, size) {
    let x, y;

    while(x_ % size != 0) {
        x_--;
    }
    while(y_ % size != 0) {
        y_--;
    }

    return {
        x: x_,
        y: y_,
        gridX: x_ / size,
        gridY: y_ / size
    }
}

function getBoxAt(gridX, gridY) {
    for(let i = 0; i < boxes.length; i++) {
        if((boxes[i].gridPos.gridX == gridX && boxes[i].gridPos.gridY == gridY)) {
            return boxes[i];
        }
    }
    return null;
}