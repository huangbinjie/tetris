import { IShape } from "./entities/shapes/IShape";
import { ActorSystem, AbstractActor, ActorRef } from "js-actor"
import { Update } from "./Update";
import { IEntity } from "./entities/IEntity";
import { GenerationSystem } from "./systems/Generation/Generation";
import { InputSystem } from "./systems/input/Input";
import { Start } from "./Start";
import { DetectSystem } from "./systems/detect/Detect";
import { IScore } from "./entities/score/IScore";
import { ScoreSystem } from "./systems/score/Score";
import { MoveSystem } from "./systems/move/Move";
import { GravitySystem } from "./systems/gravity/Gravity";

export class World {
  private entities: IEntity[] = []
  private systemSystem = new ActorSystem("game")
  public col = 10
  public row = 20
  public boards = genBoards(this.row, this.col)
  public moveQueue: string[] = []
  public gravity = 1
  public lastUpdated = 0

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

  public getCurrentShape() {
    return this.getEntities().find(shape => shape.moveComponent) as IShape | undefined
  }

  public getNextShape() {
    return this.getEntities().find(shape => shape.nextComponent) as IShape | undefined
  }

  public getScore() {
    return this.getEntities().find(entity => entity.scoreComponent) as IScore
  }

  public start(ctx: CanvasRenderingContext2D) {
    this.addSystem(new GenerationSystem(this))
    this.addSystem(new InputSystem(this))
    this.addSystem(new MoveSystem(this))
    this.addSystem(new DetectSystem(this))
    this.addSystem(new ScoreSystem(this))
    this.addSystem(new GravitySystem(this))
    this.broadcast(new Start)
    this.update(ctx)
  }

  public update(ctx: CanvasRenderingContext2D) {
    this.broadcast(new Update)
    const movingShape = this.getCurrentShape()
    const nextShape = this.entities.find(entity => entity.nextComponent) as IShape
    const score = this.getScore()

    drawStage(ctx, this.col, this.row, this.boards)

    if (movingShape) {
      drawShape(ctx, movingShape)
    }

    drawGenerationArea(ctx)

    if (nextShape) {
      drawNextShape(ctx, nextShape, 220, 36)
    }

    drawScore(ctx, score.scoreComponent.value)

    requestAnimationFrame(this.update.bind(this, ctx))
  }

  public stop() {

  }

  eliminateRow() {
    // *) 消除成行的方块
    var eliminateNum = 0;
    var eliminateArr = new Array(this.row);
    for (var i = this.row - 1; i >= 0; i--) {
      var gridNum = 0;
      for (var j = 0; j < this.col; j++) {
        if (this.boards[i][j] == 0) {
          break;
        }
        gridNum++;
      }
      // *) 满足消掉的条件
      if (gridNum === this.col) {
        eliminateArr[i] = true;
        eliminateNum++;
      } else {
        eliminateArr[i] = false;
      }
    }

    if (eliminateNum > 0) {
      var nextIdx = this.row - 1;
      for (var i = this.row - 1; i >= 0; i--) {
        while (nextIdx >= 0 && eliminateArr[nextIdx] === true) {
          nextIdx--;
        }

        if (i === nextIdx) {
          nextIdx--;
          continue;
        } else {
          if (nextIdx >= 0) {
            for (var j = 0; j < this.col; j++) {
              this.boards[i][j] = this.boards[nextIdx][j];
            }
            nextIdx--;
          } else {
            for (var j = 0; j < this.col; j++) {
              this.boards[i][j] = 0;
            }
          }
        }
      }
    }

    return eliminateNum;
  }

  occupied(tx: number, ty: number, shapeArr: number[][]) {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (shapeArr[i][j] == 1) {
          if (tx + j < 0 || tx + j >= this.col || ty + i < 0 || ty + i >= this.row) {
            return true;
          }
          if (this.boards[ty + i][tx + j] == 1) {
            return true;
          }
        }
      }
    }
    return false;
  }

  applyShape(tx: number, ty: number, shapeArr: number[][]) {
    var i, j;
    for (i = 0; i < 4; i++) {
      for (j = 0; j < 4; j++) {
        if (shapeArr[i][j] === 1) {
          if (tx + j < 0 || tx + j >= this.col || ty + i < 0 || ty + i >= this.row) {
            continue;
          }
          this.boards[ty + i][tx + j] = 1;
        }
      }
    }
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