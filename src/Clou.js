function distanceBetween(pos1, pos2) {
    let vector = {
        x: pos2.x - pos1.x,
        y: pos2.y - pos1.y
    }
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2))
}


class Clou {
    constructor(position, outNode=false) {
        this.position = {x: position.x, y: position.y}
        this.id = new Date().valueOf() + Math.round((Math.random()*1000))
        this.outNode = outNode
        this.counter = 0
    }


    checkCollisions(balls)  {
        balls.forEach((ball, i, object) => {
            if( ball.lastCollision != this.id
            &&  distanceBetween(this.position, ball.position) < 10 ) {
                ball.speed.x = Math.round(Math.random()) ? -1 : 1
                ball.lastCollision = this.id
                this.counter++
                if(this.outNode) {
                    ball.speed    = {x: 0, y: 3}
                    ball.position = Object.assign({}, ball.basePosition)
                }
            }
        })
    }
};



export default Clou
