import { useEffect, useRef } from 'react'
import * as PIXI from "pixi.js"
import carPic from './assets/car.jpeg'
import disPic from "./assets/displacement.jpeg"
import { OutlineFilter,GlowFilter,ShockwaveFilter } from "pixi-filters"
import './App.css'

function App() {
  const divRef = useRef(null)

  useEffect(() => {
    console.log("wmx", Number(divRef.current.clientWidth), Number(divRef.current.clientHeight));
    const app = new PIXI.Application({
      width:Number(divRef.current.clientWidth),
      height:Number(divRef.current.clientHeight),
      // width: 1000,
      // height: 563,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
      antialias: true,
    })
    divRef.current.appendChild(app.view)    

    const container = new PIXI.Container()

    // 创建一个纹理
    const texture = PIXI.Texture.from(carPic)
    // 创建一个精灵
    const car = new PIXI.Sprite(texture)

    car.width = app.screen.width
    car.height = app.screen.height

    container.addChild(car)

    // 添加文字
    const text = new PIXI.Text("Hello PixiJs", {
      fontFamily: "Arial",
      align: "center",
      fontWeight: 500,
      fontSize: 30 + Math.floor(app.screen.width * 0.1),
      fill: 0xffffff,
      dropShadow: true,
      dropShadowColor: "#000000",
      dropShadowAngle: Math.PI / 2,
      dropShadowDistance: 2
    })
    text.x = app.screen.width / 2
    text.y = app.screen.height / 2
    text.anchor.set(0.5,0.5)

    container.addChild(text)

    // 添加置换滤镜
    const displacement = PIXI.Sprite.from(disPic)
    displacement.scale.set(0.1)
    displacement.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
    const displacementFilter = new PIXI.DisplacementFilter(displacement)
    container.addChild(displacement)
    

    

    // 添加振波滤镜
    const shockwaveFilter = new ShockwaveFilter(
      [
        Math.random() * app.screen.width,
        Math.random() * app.screen.height,
      ],{
        radius:120,// 半径
        waveLength:48,//波长
        amplitude:75,// 振幅
        speed:240
      }
    )
    const shockwaveFilter2 = new ShockwaveFilter(
      [
        Math.random() * app.screen.width,
        Math.random() * app.screen.height,
      ],{
        radius:75,// 半径
        waveLength:32,//波长
        amplitude:60,// 振幅
        speed:150
      }
    )
    const shockwaveFilter3 = new ShockwaveFilter(
      [
        Math.random() * app.screen.width,
        Math.random() * app.screen.height,
      ],{
        radius:60,// 半径
        waveLength:30,//波长
        amplitude:30,// 振幅
        speed:150
      }
    )

    container.filters=[
      displacementFilter,
      shockwaveFilter,
      shockwaveFilter2,
      shockwaveFilter3
    ]

    function createWave(waveFilter,resetTime){
      waveFilter.time += 0.01
      // 重置时间小于波浪时间
      if(waveFilter.time>resetTime){
        waveFilter.time = 0
        waveFilter.center = [Math.random() * app.screen.width, Math.random() * app.screen.height]
      }
    }

    container.eventMode="static"
    container.on("click",(e)=>{
      shockwaveFilter.center=[e.clientX,e.clientY]
      shockwaveFilter.time=0
    })

    app.ticker.add((delta)=>{
      displacement.x+=1
      displacement.y+=1
      createWave(shockwaveFilter,1)
      createWave(shockwaveFilter2,1.2)
      createWave(shockwaveFilter3,0.7)
    })

    app.stage.addChild(container)

    return () => {
      divRef.current.removeChild(app.view)
    }
  }, [])


  return (
    <div ref={divRef} style={{
      width: "100vw",
      height: "100vh",
      overflow:"hidden"
    }}>

    </div>
  )
}

export default App
