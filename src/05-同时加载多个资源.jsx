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

    // 添加资源
    // 写 ./ 时 不会被解析成正确的路径 可以写个插件解决
    // PIXI.Assets.add("bunny",'/src/assets/bunny.png')
    // PIXI.Assets.add("panda",'/src/assets/panda.png')
    // PIXI.Assets.add("pixi",'/src/assets/pixi.png')
    // // 异步加载资源
    // const texturePromise = PIXI.Assets.load(["bunny","panda","pixi"],(progress)=>{
    //   console.log("加载进度",progress);
    // }) 

    // 添加场景1的资源
    PIXI.Assets.addBundle("scene1",{
      "bunny":"/src/assets/bunny.png",
      "panda":"/src/assets/panda.png",
      "pixi":"/src/assets/pixi.png"
    })

    const texturePromise2 = PIXI.Assets.loadBundle("scene1",(progress)=>{
      console.log("加载进度",progress);
    })



    // 加载完成后创建精灵
    texturePromise2.then((textures)=>{

      // 创建容器
      const container = new PIXI.Container()

      // container.x = 100

      const bunny = new PIXI.Sprite(textures.bunny)
      bunny.x = 100
      bunny.y = 100

      bunny.anchor.set(0.5, 0.5)
      bunny.eventMode = "static"

      bunny.buttonMode=true 
      bunny.blendMode=PIXI.BLEND_MODES.ADD

      bunny.on('pointerdown',()=>{
        console.log("pointdowx");
      })

      container.addChild(bunny)

      // 创建一个精灵
      const panda = new PIXI.Sprite(textures.panda)
      panda.x = 100
      panda.y = 100

      container.addChild(panda)

      app.stage.addChild(container)
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
