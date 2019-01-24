import  React  from 'react'
import { Stage, Graphics, Text } from '@inlet/react-pixi'

class Histogram extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Stage width={window.innerWidth} height={window.innerHeight * 9/10} options={{ antialias: true }}>
                <Text x={0} y={0} text={"nBilles : " + this.props.nBillesArrivees} style={this.props.normalStyle}/>
                <Graphics
                    draw={g => {
                        g.clear()
                        g.lineStyle(0)
                        g.beginFill(0xffff0b, 1)
                        this.props.clous.filter(clou => clou.outNode).forEach(clou => {
                            g.beginFill(clou.outNode ? 0xFF00FF : 0xAAAAAA , 1)
                            g.drawRect(clou.position.x, clou.position.y-5/2 - clou.counter * 10, 5, clou.counter * 10)
                        })
                        g.endFill()
                    }}
                />
            </Stage>
        )
    }
}
export default Histogram