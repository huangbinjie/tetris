import { AbstractActor, ActorRef } from "js-actor"
import { World } from "../../world";
import { Start } from "../../Start";
import { IShape } from "../../entities/shapes/IShape";

export class InputSystem extends AbstractActor {
  constructor(
    private world: World
  ) {
    super()
  }
  createReceive() {
    return this.receiveBuilder()
      .match(Start, () => {
        window.addEventListener("keydown", event => {
          const current = this.world.getCurrentShape()
          const keyDirection = this.checkDirection(event.keyCode)
          if (current) {
            const direction = current.directionComponent.value
            const shape = current.shapeComponent.value[direction]
            switch (keyDirection) {
              case "left": {
                this.world.gravity = 1
                const { x, y } = current.positionComponent
                const nextX = x - 1
                if (!this.occupied(nextX, y, shape)) {
                  current.positionComponent.x -= 1
                }
                break
              }
              case "right": {
                this.world.gravity = 1
                const { x, y } = current.positionComponent
                const nextX = x + 1
                if (!this.occupied(nextX, y, shape)) {
                  current.positionComponent.x += 1
                }
                break
              }
              case "up": {
                this.world.gravity = 1
                const { x, y } = current.positionComponent
                const nextShapeIdx = (current.directionComponent.value + 1) % 4
                const nextShape = current.shapeComponent.value[nextShapeIdx]
                if (!this.occupied(x, y, nextShape)) {
                  current.directionComponent.value = (current.directionComponent.value + 1) % 4
                }
                break
              }
              case "down": {
                this.world.gravity = 10
                break
              }
            }
          }
        })
        window.addEventListener("keyup", event => {
          const current = this.world.getCurrentShape()
          if (current && event.keyCode === 40) {
            this.world.gravity = 1
          }
        })
      })
      .build()
  }
  checkDirection(keyCode: number) {
    switch (keyCode) {
      default:
      case 37: return "left"
      case 40: return "down"
      case 38: return "up"
      case 39: return "right"
    }
  }
  occupied(tx: number, ty: number, shapeArr: number[][]) {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (shapeArr[i][j] == 1) {
          if (tx + j < 0 || tx + j >= this.world.col || ty + i < 0 || ty + i >= this.world.row) {
            return true;
          }
          if (this.world.boards[ty + i][tx + j] == 1) {
            return true;
          }
        }
      }
    }
    return false;
  }
  drop(tx: number, ty: number, shapeArr: number[][]) {
    // *) 方块落地
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (shapeArr[i][j] == 1) {
          if (tx + j < 0 || tx + j >= this.world.col || ty + i < 0 || ty + i >= this.world.row) {
            continue;
          }
          this.world.boards[ty + i][tx + j] = 1;
        }
      }
    }
    // *) 消除成行的方块
    var eliminateNum = 0;
    var eliminateArr = new Array(this.world.row);
    for (var i = this.world.row - 1; i >= 0; i--) {
      var gridNum = 0;
      for (var j = 0; j < this.world.col; j++) {
        if (this.world.boards[i][j] == 0) {
          break;
        }
        gridNum++;
      }
      // *) 满足消掉的条件
      if (gridNum === this.world.col) {
        eliminateArr[i] = true;
        eliminateNum++;
      } else {
        eliminateArr[i] = false;
      }
    }

    if (eliminateNum > 0) {
      var nextIdx = this.world.row - 1;
      for (var i = this.world.row - 1; i >= 0; i--) {
        while (nextIdx >= 0 && eliminateArr[nextIdx] === true) {
          nextIdx--;
        }

        if (i === nextIdx) {
          nextIdx--;
          continue;
        } else {
          if (nextIdx >= 0) {
            for (var j = 0; j < this.world.col; j++) {
              this.world.boards[i][j] = this.world.boards[nextIdx][j];
            }
            nextIdx--;
          } else {
            for (var j = 0; j < this.world.col; j++) {
              this.world.boards[i][j] = 0;
            }
          }
        }
      }
    }

    return eliminateNum;
  }
}