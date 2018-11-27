import { AbstractActor, ActorRef } from "js-actor"
import { BeginRender } from "./messages/BeginRender";
import { GenerationSystem } from "../Generation/Generation";
import { NextShape } from "../Generation/messages/NextShape";
import { IShape } from "../../entities/IShape";
import { World } from "../../world";

export class RenderSystem extends AbstractActor {
  private col = 10
  private row = 20
  private boards = genBoards(this.row, this.col)
  constructor(
    private world: World,
    private generationRef: ActorRef<GenerationSystem>
  ) {
    super()
  }
  createReceive() {
    return this.receiveBuilder()
      .match(BeginRender, async () => {
        const currentShape = await this.generationRef.ask<IShape>(new NextShape)
        const nextShape = await this.generationRef.ask<IShape>(new NextShape)
        this.world.addEntity(currentShape)
        this.world.addEntity(nextShape)
        const movingShape = this.world.getEntities().find(entity => !!entity.moveComponent)
        var canvas = document.getElementById("canvas") as HTMLCanvasElement
        var ctx = canvas.getContext("2d")!

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 800, 640);

        ctx.strokeStyle = "rgb(125, 0, 0)";
        ctx.strokeRect(0, 0, 20 * this.col, 20 * this.row);



        ctx.strokeStyle = "rgb(125, 0, 0)";
        ctx.strokeRect(0, 0, 20 * this.col, 20 * this.row);

        for (var i = 0; i < this.row; i++) {
          for (var j = 0; j < this.col; j++) {
            if (this.boards[i][j] != 0) {
              ctx.fillStyle = "rgb(0, 125, 0)";
              ctx.fillRect(j * 20, i * 20, 20, 20);

              ctx.strokeStyle = "rgb(0, 255, 0)";
              ctx.strokeRect(j * 20, i * 20, 20, 20);
            }
          }
        }


        if (movingShape != null) {
          const shape = movingShape.shapeComponent.value[movingShape.directionComponent.value]
          const position = movingShape.positionComponent
          for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
              if (shape[i][j] == 1) {
                ctx.fillRect((position.x + j) * 20, (position.y + i) * 20, 20, 20);

                ctx.strokeStyle = "rgb(0, 255, 0)";
                ctx.strokeRect((position.x + j) * 20, (position.y + i) * 20, 20, 20);
              }
            }
          }
        }

        // *) 绘制傍边的信息条
        ctx.strokeStyle = "rgba(0, 0, 180, 127)";
        ctx.strokeRect(210, 0, 100, 200);

        ctx.font = "16px Courier New";
        //设置字体填充颜色
        ctx.fillStyle = "blue";
        //从坐标点(50,50)开始绘制文字

        if (nextShape !== null) {
          ctx.fillText("Next:", 220, 18);
          const shape = movingShape.shapeComponent.value[movingShape.directionComponent.value]
          const position = movingShape.positionComponent
          ctx.fillStyle = this.color;
          for ( var i = 0; i < 4; i++ ) {
              for ( var j = 0; j < 4; j++ ) {
                  if ( shapesArr[i][j] == 1 ) {
                      ctx.fillRect(offsetx + j * 20, offsety + i * 20, 20, 20);
  
                      ctx.strokeStyle = "rgb(0, 255, 0)";
                      ctx.strokeRect(offsetx + j * 20, offsety + i * 20, 20, 20);
                  }
              }
          }
        }

        ctx.fillText("Score: ", 220, 138);
        ctx.fillText("  " + this.score, 220, 156);
      })
      .build()
  }
}

function genBoards(row: number, col: number) {
  const boards = new Array(row);
  for (var i = 0; i < row; i++) {
    boards[i] = new Array(col);
    for (var j = 0; j < col; j++) {
      boards[i][j] = 0;
    }
  }

  const bkBoards = new Array(row);
  for (var i = 0; i < row; i++) {
    bkBoards[i] = new Array(col);
    for (var j = 0; j < col; j++) {
      bkBoards[i][j] = 0;
    }
  }
  return boards
}