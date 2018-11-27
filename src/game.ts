import { World } from "./world";
import { RenderSystem } from "./systems/Render/RenderSystem";
import { GenerationSystem } from "./systems/Generation/Generation";

const world = new World

const generationRef = world.addSystem(new GenerationSystem())

world.addSystem(new RenderSystem(world, generationRef))

world.start()
