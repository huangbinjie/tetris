// `import { AbstractActor } from "js-actor"
// import { World } from "../../world"
// import { Input } from "../input/messages/Input"
// import { Update } from "../../Update";
// import { IShape } from "../../entities/shapes/IShape";

// export class MoveSystem extends AbstractActor {
//   constructor(
//     private world: World
//   ) {
//     super()
//   }
//   createReceive() {
//     return this.receiveBuilder()
//       .match(Update, () => {
//         const moveQueue = this.world.moveQueue
//         const current = this.world.getCurrentShape()
//         if (current) {
//           for (let direction of moveQueue) {
//             this.move(current, direction)
//           }
//         }
//       })
//       .build()
//   }
//   move(current: IShape, keyDirection: string) {
//     const pieceDirection = current.directionComponent.value
//     const shape = current.shapeComponent.value[pieceDirection]
//     switch (keyDirection) {
//       case "left": {
//         current.gravityComponent.value = 1
//         const { x, y } = current.positionComponent
//         const nextX = x - 1
//         if (this.occupied(nextX, y, shape)) {
//           current.positionComponent.x -= 1
//         }
//         break
//       }
//       case "right": {
//         current.gravityComponent.value = 1
//         const { x, y } = current.positionComponent
//         const nextX = x + 1
//         if (this.occupied(nextX, y, shape)) {
//           current.positionComponent.x += 1
//         }
//         break
//       }
//       case "up": {
//         current.gravityComponent.value = 1
//         const { x, y } = current.positionComponent
//         const nextShapeIdx = (current.directionComponent.value + 1) % 4
//         const nextShape = current.shapeComponent.value[nextShapeIdx]
//         if (this.occupied(x, y, nextShape)) {
//           current.directionComponent.value = (current.directionComponent.value + 1) % 4
//         }
//         break
//       }
//       case "down": {
//         const { x, y } = current.positionComponent
//         this.drop(x, y, shape)
//         break
//       }
//     }
//   }
//   occupied(tx: number, ty: number, shapeArr: number[][]) {
//     for (var i = 0; i < 4; i++) {
//       for (var j = 0; j < 4; j++) {
//         if (shapeArr[i][j] == 1) {
//           if (tx + j < 0 || tx + j >= this.world.col || ty + i < 0 || ty + i >= this.world.row) {
//             return false;
//           }
//           if (this.world.boards[ty + i][tx + j] == 1) {
//             return false;
//           }
//         }
//       }
//     }
//     return true;
//   }
//   drop(tx: number, ty: number, shapeArr: number[][]) {
//     // *) 方块落地
//     for (var i = 0; i < 4; i++) {
//       for (var j = 0; j < 4; j++) {
//         if (shapeArr[i][j] == 1) {
//           if (tx + j < 0 || tx + j >= this.world.col || ty + i < 0 || ty + i >= this.world.row) {
//             continue;
//           }
//           this.world.boards[ty + i][tx + j] = 1;
//         }
//       }
//     }
//   }
// }`