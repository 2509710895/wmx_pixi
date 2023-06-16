import { useEffect, useRef } from 'react'
import * as PIXI from "pixi.js"
import bunnyPng from './assets/bunny.png'
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

    // 创建一个纹理
    const texture = PIXI.Texture.from(bunnyPng)

    // 创建一个精灵
    const bunny = new PIXI.Sprite(texture)

    // 设置精灵锚点
    bunny.anchor.set(0.5, 0.5)
    bunny.x = app.screen.width / 2
    bunny.y = app.screen.height / 2

    bunny.rotation = Math.PI / 4
    bunny.scale.set(2, 2)

    // bunny.alpha = 0.5

    // 为精灵添加交互事件
    // bunny.interactive = true
    // 为 DisplayObject 启用交互事件。触摸、指针和鼠标。这现在取代了interactive属性有 5 种类型的交互设置：
    // 'none': 忽略所有交互事件，即使是在其子项上。
    // 'passive'：不发出事件并忽略对自身和非交互式子项的所有命中测试。互动的孩子仍然会发出事件。
    // 'auto'：不发出事件，但如果父项是交互式的，则会进行命中测试。interactive = false与 v7相同
    // 'static'：发出事件并进行命中测试。interaction = true与 v7相同
    // 'dynamic'：发出事件并进行命中测试，但也会接收从自动收报机触发的模拟交互事件，以允许在鼠标不移动时进行交互
    bunny.eventMode = "static"
    bunny.on('click', () => {
      console.log("bunny click stop",ticker);
      if(ticker) ticker.stop()
    })

    bunny.on('pointerenter',()=>{
      console.log("pointer enter");
    })

    // ticker 实现动画
    const ticker= app.ticker.add((delta) => {
      bunny.rotation += 0.01 * delta
    })

    app.stage.addChild(bunny)


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
