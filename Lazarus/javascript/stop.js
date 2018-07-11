function StopBtn(gridPos) {
    this.img = stopImg;
    this.gridPos = gridPos;
    this.size = 62;

    this.show = function() {
        ctx.drawImage(this.img, this.gridPos.x, this.gridPos.y, this.size, this.size);
    }

    this.update = function() {
        if(this.gridPos.y == lazarus.gridPos.y && this.gridPos.x == lazarus.gridPos.x && !stopped) {
            alert("stopped");
            clearInterval(spawnBoxTimer);
            stopped = true;
        }
        this.show();
    }
}