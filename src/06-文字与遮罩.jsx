import { useEffect, useRef } from 'react'
import * as PIXI from "pixi.js"
// import bunnyPng from './assets/bunny.png'
import bgPic from './assets/bg_plane.jpeg'
import './App.css'

function App() {
  const divRef = useRef(null)

  useEffect(() => {
    console.log("wmx", Number(divRef.current.clientWidth), Number(divRef.current.clientHeight));
    const app = new PIXI.Application({
      // width:Number(divRef.current.clientWidth),
      // height:Number(divRef.current.clientHeight),
      width: 1000,
      height: 400,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
      antialias: true,
    })
    divRef.current.appendChild(app.view)

    // 显示文字
    const text = new PIXI.Text("Hello World", {
      fontFamily:"Arial",
      fontSize:36,
      fill:"white",
      align:"center",
    })
    // 文字位置
    text.x = app.screen.width/2
    text.y = app.screen.height/2
    // 文字锚点
    text.anchor.set(0.5,0.5)
    app.stage.addChild(text)

    // 创建一个圆形
    const circle = new PIXI.Graphics()
    circle.beginFill(0xff0000)
    circle.drawCircle(0,0,50)
    circle.endFill()
    circle.x = app.screen.width/2
    circle.y = app.screen.height/2
    app.stage.addChild(circle)

    // 创建一个精灵
    const bg = PIXI.Sprite.from(bgPic)
    bg.width = app.screen.width
    bg.height = app.screen.height

    // 用文字作为精灵的遮罩
    // bg.mask = text
    bg.mask = circle

    app.stage.addChild(bg)
    


    return () => {
      divRef.current.removeChild(app.view)
    }
  }, [])


  return (
    <div ref={divRef} style={{
      width: "1000px",
      height: "400px",
    }}>

    </div>
  )
}

export default App
