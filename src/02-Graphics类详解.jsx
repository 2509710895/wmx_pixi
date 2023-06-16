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
