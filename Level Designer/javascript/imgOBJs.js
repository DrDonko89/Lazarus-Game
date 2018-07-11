function Box(gridPos, size) {
    this.gridPos = gridPos;
    this.size = size;

    this.show = function() {
        ctx.drawImage(wall, this.gridPos.x, this.gridPos.y, this.size, this.size);
    }
}

function StopBtn(gridPos) {
    this.img = stopImg;
    this.gridPos = gridPos;
    this.size = 62;

    this.show = function() {
        ctx.drawImage(this.img, this.gridPos.x, this.gridPos.y, this.size, this.size);
    }
}

function Lazarus(gridPos) {
    this.img = laz;
    this.gridPos = gridPos;
    this.size = 62;

    this.show = function() {
        ctx.drawImage(this.img, this.gridPos.x, this.gridPos.y , this.size, this.size);
    }
}