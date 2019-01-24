import React from 'react'
import { Stage, Graphics, Text } from '@inlet/react-pixi'
import Bille from './Bille'
import Clou from './Clou'
import Histogram from './Histogram'
import * as PIXI from 'pixi.js';
import makeGaussian from './Gaussian'

const style = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 20,
  fontStyle: 'italic',
  fontWeight: 'bold',
  fill: ['#ffffff', '#00ff99'], // gradient
  stroke: '#4a1850',
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
  wordWrap: true,
  wordWrapWidth: 440
})


const normalStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', ],
      })
  

class Planche extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shouldUpdate: true,
            tickId: null,
            billes: [],
            clous: [],
        }

        let nBilles = 100
        for(let i = 0 ; i < nBilles ; i++) {
            this.state.billes.push(new Bille({x: window.innerWidth / 2, y: - i * 100}))
        }

        let nClous = Math.round(window.innerHeight * (7/8) / 75)
        let basePos = {x: window.innerWidth / 2 + 25, y: 0}
        for(let i = 0 ; i < nClous ; i++) {
            for(let j = 0 ; j < i ; j++) {
                let x = basePos.x - i * 50 / 2 + j * 50
                this.state.clous.push(new Clou({x, y: basePos.y + i * 75}, i == nClous - 1))
            }
        }
    }

    componentDidMount () {
        var tickId = setInterval(() => this.tick(), 10);
        this.setState({tickId});
    }

    componentWillUnmount () {
        clearInterval(this.state.tickId);
    }

    shouldComponentUpdate(nextProps, nextState) {
        let should = this.state.shouldUpdate
        if (should) {
            this.setState({
                shouldUpdate: !this.state.shouldUpdate
            })
        }
        return should
    }


    tick() {
        this.state.billes.forEach(bille => {
            bille.tick()
        })
        this.state.clous.forEach(clou => {
            clou.checkCollisions(this.state.billes)
        })
        this.setState({
            shouldUpdate: true
        })
    }

    render() {        
        let eligibleClous = this.state.clous.filter(c => c.outNode)

        let nBillesArrivees = 0
        eligibleClous.forEach(clou => {
            nBillesArrivees += clou.counter
        })

        let clousAnnotations = eligibleClous.map(clou => {
            return (
                <Text x={clou.position.x - 11} y={clou.position.y + 10} text={clou.counter} style={style}/>
            )
        })
        return(
            <Stage width={window.innerWidth} height={window.innerHeight * 9/10} options={{ antialias: true }}>
                <Text x={0} y={0} text={"nBilles : " + nBillesArrivees} style={normalStyle}/>
                <Graphics
                    draw={g => {
                        g.clear()
                        if(nBillesArrivees < 100) {
                            g.lineStyle(0)
                            g.beginFill(0xffff0b, 1)
                            this.state.billes.forEach(bille => {
                                g.drawCircle(bille.position.x, bille.position.y, 5)
                            })
                        
                            this.state.clous.forEach(clou => {
                                g.beginFill(clou.outNode ? 0xFF00FF : 0xAAAAAA , 1)
                                g.drawCircle(clou.position.x, clou.position.y, 5)
                            })
                        }
                        let gaussian = makeGaussian(0,1,100);
                        this.state.clous.filter(clou => clou.outNode).forEach(clou => {
                            g.beginFill(clou.outNode ? 0xFF00FF : 0xAAAAAA , 1)
                            g.drawRect(clou.position.x-5/2, clou.position.y - clou.counter * 10, 5, clou.counter * 10)
                            g.beginFill( 0xAAAAAA , 1)
                        })    
                        g.endFill()
                    }}
                />
                {clousAnnotations}
            </Stage>
        )
    }
}

export default Planche;
