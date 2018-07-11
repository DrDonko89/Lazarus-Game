function createGrid(size) {
    var curX = size;
    var curY = size;
    while(curX < w) {
        stroke(255, 90);
        line(curX, 0, curX, h);
        curX += size;
    }
    while(curY < h) {
        stroke(255, 90);
        line(0, curY, w, curY);
        curY += size;
    }
}

function getGridPos(gridX, gridY, size) {
    var xPos = gridX * size;
    var yPos = gridY * size;
    if(xPos % size != 0 || yPos % size != 0) {
        console.error("Can't pick a grid position.");
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

function getBoxAt(gridX, gridY) {
    for(let i = 0; i < boxes.length; i++) {
        if((boxes[i].gridPos.gridX == gridX && boxes[i].gridPos.gridY == gridY) && boxes[i].falling == false) {
            return boxes[i];
        }
    }
    return null;
}

function gridUpdate(obj, size) {
    let newGridX = Math.floor(obj.x / size);
    let newGridY = Math.floor(obj.y / size);
    return {
        gridX: newGridX,
        gridY: newGridY,
        x: obj.x,
        y: obj.y
    }
}