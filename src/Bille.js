class Bille {
    constructor(position) {
        this.speed        = {x: 0,   y: 3}
        this.position     = {x: position.x, y: position.y}
        this.basePosition = Object.assign({}, position)
    }
    tick() {
        this.position.x += this.speed.x
        this.position.y += this.speed.y
    }
};

export default Bille
