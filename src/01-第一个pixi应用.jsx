import { useEffect, useRef } from 'react'
import * as PIXI from "pixi.js"
import './App.css'

function App() {
  const divRef= useRef(null)

  useEffect(() => {
    console.log("wmx",Number(divRef.current.clientWidth),Number(divRef.current.clientHeight));
    const app = new PIXI.Application({
      width:Number(divRef.current.clientWidth),
      height:Number(divRef.current.clientHeight),
      // width:500,
      // height:500,
      backgroundColor:0x1099bb,
      resolution:window.devicePixelRatio || 1,
    })
    divRef.current.appendChild(app.view)

    // 创建一个矩形
    const rectangle = new PIXI.Graphics()
    // 填充颜色
    rectangle.beginFill("red")
    // 画矩形
    rectangle.drawRect(100,100,50,50)
    // 结束填充
    rectangle.endFill()

    // 添加矩形到舞台
    app.stage.addChild(rectangle)

    return ()=>{
      divRef.current.removeChild(app.view)
    }
  },[])


  return (
    <div ref={divRef} style={{
      width:"500px",
      height:"500px",
    }}>

    </div>
  )
}

export default App
