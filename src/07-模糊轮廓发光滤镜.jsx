import { useEffect, useRef } from 'react'
import * as PIXI from "pixi.js"
import bunnyPng from './assets/bunny.png'
// import bgPic from './assets/bg_plane.jpeg'
import { OutlineFilter,GlowFilter } from "pixi-filters"
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

    

    // 创建一个精灵
    const bunny = PIXI.Sprite.from(bunnyPng)
    bunny.x = app.screen.width / 2
    bunny.y = app.screen.height / 2

    bunny.anchor.set(0.5, 0.5)

    app.stage.addChild(bunny)

    // 创建模糊滤镜
    const blurFilter = new PIXI.BlurFilter()
    // 设置模糊滤镜的模糊程度
    blurFilter.blur = 5
    // 添加
    // bunny.filters = [blurFilter]
    // 创建轮廓滤镜
    const outlineFilterBlue = new OutlineFilter(2, 0x99ff99) // 轮廓宽度，轮廓颜色
    // 创建发光滤镜
    const glowFilter = new GlowFilter({
      distance: 15,
      outerStrength: 2,
      innerStrength: 0,
      color: 0x00ff00,
      quality: 0.5
    })
    bunny.filters = [outlineFilterBlue,glowFilter]

    bunny.eventMode="static"
    bunny.on('pointerenter',()=>{
      blurFilter.blur = 0
    })
    bunny.on('pointerout',()=>{
      blurFilter.blur = 5
    })
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
