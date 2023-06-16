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
      backgroundColor: 0xffffff,
      resolution: window.devicePixelRatio || 1,
      antialias: true,
    })
    divRef.current.appendChild(app.view)

    const container = new PIXI.Container()

    app.stage.addChild(container)

    // 添加恐龙游戏的精灵纹理
    const baseTexture = PIXI.BaseTexture.from("./assets/game.png")

    const dinoTextures = new PIXI.Texture(baseTexture, new PIXI.Rectangle(75, 0, 88, 100))

    const dino = new PIXI.Sprite(dinoTextures)

    container.addChild(dino)

    // 恐龙跑步动画
    const runTextures = []

    for (let i = 0; i < 6; i++) {
      runTextures.push(new PIXI.Texture(baseTexture, new PIXI.Rectangle(1680 + 88 * (2*i), 0, 82, 100)))
    }

    const runAnimation = new PIXI.AnimatedSprite(runTextures)
    runAnimation.animationSpeed = 0.1
    runAnimation.play()
    runAnimation.visible = false
    container.addChild(runAnimation)

    // 恐龙跳跃精灵
    const jumpTexture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(1680, 0, 82, 100))

    const jumpSprite = new PIXI.Sprite(jumpTexture)
    jumpSprite.x = 60
    jumpSprite.y = app.screen.height - 50 - 100
    jumpSprite.visible = false

    container.addChild(jumpSprite)

    // 创建地面精灵
    const groundTexture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(50, 100, 2300, 30))

    const ground = new PIXI.TilingSprite(groundTexture)
    ground.width = app.screen.width
    ground.height = 30
    // 设置地面精灵的位置
    ground.position.set(0, app.screen.height - 50)
    container.addChild(ground)

    // 创建仙人掌
    const cactusTexture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(515, 0, 30, 60))
    const cactus = new PIXI.Sprite(cactusTexture)
    cactus.x = app.screen.width / 2
    cactus.y = app.screen.height - 110
    container.addChild(cactus)

    // 创建文字
    const startText = new PIXI.Text("点击开始游戏", {
      fontFamily: "Arial",
      align: "center",
      fontWeight: 500,
      fontSize: 36,
      fill: 0x333333,
    })
    startText.x = app.screen.width / 2
    startText.y = app.screen.height / 2
    startText.anchor.set(0.5)
    container.addChild(startText)

    startText.eventMode = "static"
    startText.on("click", () => {
      playGame()
    })

    let isGaming = false
    let isGameOver = false

    function playGame() {
      isGaming = true
      startText.visible = false
      // 显示跑步动画
      runAnimation.visible = true
      runAnimation.x = 60
      runAnimation.y = app.screen.height - 50 - 100
    }

    // 游戏得分
    let score = 0
    // 初始化跳跃速度
    let jumpSpeed = 20
    // 初始化重力
    let gravity = 1
    // 游戏循环
    app.ticker.add(() => {
      if(isGameOver){
        return
      }
      if (isGaming) {
        // 地面移动
        ground.tilePosition.x -= 10
        // 仙人掌移动
        cactus.x -= 10
        if(cactus.x < -cactus.width){
          cactus.x = app.screen.width
          score++
        }
      }
      // 跳跃
      if (jumpSpeed > 0) {
        jumpSpeed -= gravity
        jumpSprite.y -= jumpSpeed
        if (jumpSprite.y >= app.screen.height - 50 - 100) {
          jumpSprite.y = app.screen.height - 50 - 100
          jumpSpeed = 20
          jumpSprite.visible = false
          runAnimation.visible = true
        }
      }
      // 碰撞检测
      if (
        jumpSprite.y + jumpSprite.height >= cactus.y &&
        jumpSprite.x + jumpSprite.width >= cactus.x &&
        jumpSprite.x <= cactus.x + cactus.width
      ) {
        // 游戏结束
        gameOver()
        // 显示文字
        gameOverText.visible = true
      }
    })

    function gameOver() {
      isGaming = false
      isGameOver = true
    }

    // 创建游戏结束文字
    const gameOverText = new PIXI.Text(`游戏结束，最后得分：${score}`, {
      fontFamily: "Arial",
      align: "center",
      fontWeight: 500,
      fontSize: 36,
      fill: 0x333333,
    })
    gameOverText.x = app.screen.width / 2
    gameOverText.y = app.screen.height / 2
    gameOverText.anchor.set(0.5)
    gameOverText.visible = false
    container.addChild(gameOverText)

    gameOverText.eventMode = "static"
    gameOverText.on("click", () => {
      location.reload()
    })

    // 添加键盘事件
    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        if (isGaming) {
          // 跳跃
          runAnimation.visible = false
          jumpSprite.visible = true
          jumpSpeed = 20
        } else {
          playGame()
        }
      }
    })

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
