import { Scene } from "phaser";

export class BaseScene extends Scene {

    centerContainer
    config
    currentScene

    constructor(config) {
        super(config.name);
        this.config = config
    }

    
  init(config) {
    this.currentScene = config.key
    console.log('BaseScene init', this.scene.key);
  }

    create() {
        const { width, height } = this.scale;
        const bg = this.add.image(width / 2, height / 2, this.config.background).setOrigin(0.5);
        const originalBgW = bg.width;
        const originalBgH = bg.height;
        bg.setScale(Math.max(width / originalBgW, height / originalBgH)).setDepth(-1);

        this.scale.on('resize', ({ width, height }) => {
            bg.setPosition(width / 2, height / 2);
            bg.setScale(Math.max(width / originalBgW, height / originalBgH));
        });
        // Listen for resize
        this.scale.on('resize', this.resize, this);
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.scale.off('resize', this.resize);
        });
    }

    resize(gameSize) {
        const { width, height } = gameSize;
        if (this.centerContainer)
            this.centerContainer.setPosition(width / 2, height / 2 - 150);
    }


}