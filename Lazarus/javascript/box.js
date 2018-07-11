function Box(x, y, size, boxType, gridPos, boxTypeString) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = boxType;
    this.falling = true;
    this.gridPos = gridPos;
    this.bts = boxTypeString;

    this.show = function() {
        ctx.drawImage(this.type, this.x, this.y, this.size, this.size);
    }

    this.update = function() {
        if(this.falling && this.bts != "wall") {
            this.y += 1;
            this.checkFall();
            if(this.y % this.size == 0) {
                this.gridPos.gridY++;
            }
        }
        if(this.bts === "wall") this.falling = false;
        this.show();
    }

    this.checkFall = function() {
        for(let i = 0; i < boxes.length; i++) {
            let curBox = boxes[i];
            let trueCurBox = curBox.y == this.y + this.size && this.gridPos.x == curBox.gridPos.x;
            if((curBox.y == this.y + this.size && this.gridPos.x == curBox.gridPos.x) || this.y + this.size == h) {
                if(typeStrings.indexOf(curBox.bts) < typeStrings.indexOf(this.bts) && trueCurBox) {
                    boxes.splice(i, 1);
                } else {
                    this.falling = false;
                }
            }
        }
    }
}