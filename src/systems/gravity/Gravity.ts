// import { AbstractActor, ActorRef } from "js-actor"
// import { World } from "../../world";
// import { Update } from "../../Update";
// import { IShape } from "../../entities/shapes/IShape";

// export class GravitySystem extends AbstractActor {
//   constructor(
//     private world: World
//   ) {
//     super()
//   }
//   createReceive() {
//     return this.receiveBuilder()
//       .match(Update, () => {
//         const now = Date.now()
//         const currentShape = this.world.getEntities().find(shape => shape.moveComponent) as IShape | undefined
//         if (currentShape) {
//           if (now - this.world.lastUpdated > 500 / currentShape.moveComponent) {
//             currentShape.positionComponent.y += 1
//             this.world.lastUpdated = now
//           }
//         }
//       })
//       .build()
//   }
// }