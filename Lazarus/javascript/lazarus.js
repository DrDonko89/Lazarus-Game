function Lazarus(gridPos, size) {
    this.gridPos = laz_startPos;
    this.size = size;
    this.img = laz;
    this.falling = false;
    this.splatted = false;

    this.show = function() {
        ctx.drawImage(this.img, this.gridPos.x, this.gridPos.y, this.size, this.size);
    }

    this.move = function(dir) {
        //Check if Lazarus is dead
        if(this.splatted) return;
        //Check if lazarus is allowed to move
        if(!canMove) return;

                    //Detect for Lazarus move to the left
        if(dir === "left") {
            //Check if Lazarus doesn't move out of the screen
            if(this.gridPos.x == 0) return;
            //Move lazarus to the left
            if(getBoxAt(this.gridPos.gridX - 1, this.gridPos.gridY) === null) {
                this.gridPos = getGridPos(this.gridPos.gridX - 1, this.gridPos.gridY, 62);
                return true;
            } else if(getBoxAt(this.gridPos.gridX - 1, this.gridPos.gridY - 1) === null) {
                this.gridPos = getGridPos(this.gridPos.gridX - 1, this.gridPos.gridY - 1, 62);
                return true;
            } else {
                return false;
            }       //Detect for Lazarus move to the rigth
        } else if(dir === "right") {
            //Check if Lazarus doesn't move out of the screen
            if(this.gridPos.x + this.size >= w) return;
            //Move lazarus to the right
            if(getBoxAt(this.gridPos.gridX + 1, this.gridPos.gridY) === null) {
                this.gridPos = getGridPos(this.gridPos.gridX + 1, this.gridPos.gridY, 62);
                return true;
            } else if(getBoxAt(this.gridPos.gridX + 1, this.gridPos.gridY - 1) === null) {
                this.gridPos = getGridPos(this.gridPos.gridX + 1, this.gridPos.gridY - 1, 62);
                return true;
            } else {
                return false;
            }
        }
    }

    this.checkFalling = function() {
        if(getBoxAt(this.gridPos.gridX, this.gridPos.gridY + 1) === null) {
            if(this.gridPos.y + this.size >= h) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    this.checkSplat = function() {
        for(var i = 0; i < boxes.length; i++) {
            let b = boxes[i];
            let bGrid = getGridPos(b.gridPos.gridX, b.gridPos.gridY, 62);
            if(this.gridPos.y <= bGrid.y + 62 && this.gridPos.y >= bGrid.y && b.gridPos.gridX == this.gridPos.gridX) {
                this.splatted = true;
            }
        }
    }

    this.update = function() {
        //Check if Lazarus is dead
        if(!this.splatted) {
             //Check for gravity of Lazarus
            this.falling = this.checkFalling();
            this.checkSplat();
            if(this.falling) {
            this.gridPos.y += 8;
                if(this.gridPos.y >= getGridPos(this.gridPos.gridX, this.gridPos.gridY, 62).y + 62) {
                this.gridPos.gridY++;
                }
            }
            //Check for falling boxes
            if(this.splatted) {
                this.img = laz_splat;
                clearInterval(spawnBoxTimer);
            }
        }
        this.show();
    }
}