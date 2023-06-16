import { useEffect, useRef } from 'react'
import * as PIXI from "pixi.js"
import './App.css'

function App() {
  const divRef= useRef(null)

  useEffect(() => {
    console.log("wmx",Number(divRef.current.clientWidth),Number(divRef.current.clientHeight));
    const app = new PIXI.Application({
      // width:Number(divRef.current.clientWidth),
      // height:Number(divRef.current.clientHeight),
      width:1000,
      height:1000,
      backgroundColor:0x1099bb,
      resolution:window.devicePixelRatio || 1,
      antialias:true,
    })
    divRef.current.appendChild(app.view)

    // 创建一个矩形
    const rectangle = new PIXI.Graphics()
    // 设置边框样式 宽度 颜色 透明度
    rectangle.lineStyle(4,"0x99ff99",1)
    // 填充颜色
    rectangle.beginFill("red")
    // 画矩形
    rectangle.drawRect(0,0,250,50)
    // 结束填充
    rectangle.endFill()

    // 图形缩放
    // rectangle.scale.set(2,2)
    // 图形位移
    rectangle.position.set(100,100)
    // 图形的旋转
    // rectangle.rotation = Math.PI/2
    // 修改图形锚点
    // rectangle.pivot.set(125,25)

    // 添加矩形到舞台
    app.stage.addChild(rectangle)

    // 创建一个圆形
    const circle = new PIXI.Graphics()
    circle.beginFill("0x9966ff")
    circle.drawCircle(50,50,50)
    circle.endFill()
    
    app.stage.addChild(circle)

    // 绘制圆角矩形
    const roundRect = new PIXI.Graphics()
    roundRect.lineStyle(4,"0xff3300",1)
    roundRect.beginFill("0x66ccff")
    roundRect.drawRoundedRect(300,300,50,50,10)
    roundRect.endFill()

    app.stage.addChild(roundRect)

    // 绘制椭圆
    const ellipse = new PIXI.Graphics()
    ellipse.lineStyle(4,"0x66ff99",1)
    ellipse.beginFill("0xff6699")
    ellipse.drawEllipse(100,300,50,20)
    ellipse.endFill()

    app.stage.addChild(ellipse)

    // 绘制多边形
    const polygon = new PIXI.Graphics()
    polygon.lineStyle(4,"0x66ff99",1)
    polygon.beginFill("0xff6699")
    polygon.drawPolygon([50,250,250,250,100,100])
    polygon.endFill()

    app.stage.addChild(polygon)

    // 绘制圆弧
    const arc = new PIXI.Graphics()
    arc.lineStyle(4,"0x66ff99",1)
    // arc.beginFill("0xff6699")
    // 参数说明 x坐标 y坐标 半径 起始角度 结束角度 是否逆时针
    arc.arc(100,350,50,0,Math.PI/2,false)
    // arc.endFill()

    app.stage.addChild(arc)

    // 绘制线段
    const line = new PIXI.Graphics()
    line.lineStyle(4,"0x66ff99",1)
    line.moveTo(0,0)
    line.lineTo(100,100)
    line.lineTo(200,0)
    line.position.set(200,10)

    app.stage.addChild(line)

    return ()=>{
      divRef.current.removeChild(app.view)
    }
  },[])


  return (
    <div ref={divRef} style={{
      width:"1000px",
      height:"1000px",
    }}>

    </div>
  )
}

export default App
