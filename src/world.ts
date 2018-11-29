import { IShape } from "./entities/shapes/IShape";
import { ActorSystem, AbstractActor, ActorRef } from "js-actor"
import { Update } from "./Update";
import { IEntity } from "./entities/IEntity";
import { GenerationSystem } from "./systems/Generation/Generation";
import { MoveSystem } from "./systems/Move/Move";
import { InputSystem } from "./systems/input/Input";
import { Start } from "./Start";

export class World {
  private entities: IEntity[] = []
  private systemSystem = new ActorSystem("game")
  private col = 10
  private row = 20
  private boards = genBoards(this.row, this.col)

  public addEntity(entity: IEntity) {
    this.entities.push(entity)
  }

  public removeEntity(entity: IShape) {
    this.entities.splice(this.entities.indexOf(entity))
  }

  public getEntities() {
    return this.entities
  }

  public addSystem<T extends AbstractActor>(system: T) {
    return this.systemSystem.actorOf(system) as ActorRef<T>
  }

  public broadcast(message: object) {
    this.systemSystem.broadcast(message)
  }

  public start(ctx: CanvasRenderingContext2D) {
    this.systemSystem.actorOf(new GenerationSystem(this))
    this.systemSystem.actorOf(new InputSystem(this))
    this.broadcast(new Start)
    this.update(ctx)
  }

  public update(ctx: CanvasRenderingContext2D) {
    this.broadcast(new Update)
    const movingShape = this.entities.find(entity => entity.moveComponent) as IShape
    const nextShape = this.entities.find(entity => entity.nextComponent) as IShape

    drawStage(ctx, this.col, this.row, this.boards)

    if (movingShape) {
      drawShape(ctx, movingShape)
    }

    drawGenerationArea(ctx)

    if (nextShape) {
      drawNextShape(ctx, nextShape, 220, 36)
    }

    drawScore(ctx, 0)

    requestAnimationFrame(this.update.bind(this, ctx))
  }

  public stop() {

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

function drawStage(ctx: CanvasRenderingContext2D, col: number, row: number, boards: number[][]) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 800, 640);

  ctx.strokeStyle = "rgb(125, 0, 0)";
  ctx.strokeRect(0, 0, 20 * col, 20 * row);

  ctx.strokeStyle = "rgb(125, 0, 0)";
  ctx.strokeRect(0, 0, 20 * col, 20 * row);

  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      if (boards[i][j] != 0) {
        ctx.fillStyle = "rgb(0, 125, 0)";
        ctx.fillRect(j * 20, i * 20, 20, 20);

        ctx.strokeStyle = "rgb(0, 255, 0)";
        ctx.strokeRect(j * 20, i * 20, 20, 20);
      }
    }
  }
}

function drawShape(ctx: CanvasRenderingContext2D, nextShape: IShape) {
  const shape = nextShape.shapeComponent.value[nextShape.directionComponent.value]
  const position = nextShape.positionComponent
  const color = nextShape.colorComponent.value
  ctx.fillStyle = color;
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

function drawGenerationArea(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = "rgba(0, 0, 180, 127)";
  ctx.strokeRect(210, 0, 100, 200);

  ctx.font = "16px Courier New";
  //设置字体填充颜色
  ctx.fillStyle = "blue";

  ctx.fillText("Next:", 220, 18);
}

function drawScore(ctx: CanvasRenderingContext2D, score: number) {
  ctx.fillText("Score: ", 220, 138);
  ctx.fillText("  " + score, 220, 156);
}

function drawNextShape(ctx: CanvasRenderingContext2D, nextShape: IShape, x: number, y: number) {
  const shape = nextShape.shapeComponent.value[nextShape.directionComponent.value]
  const color = nextShape.colorComponent.value
  ctx.fillStyle = color;
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (shape[i][j] == 1) {
        ctx.fillRect(x + j * 20, y + i * 20, 20, 20);

        ctx.strokeStyle = "rgb(0, 255, 0)";
        ctx.strokeRect(x + j * 20, y + i * 20, 20, 20);
      }
    }
  }
}