export class Button extends Phaser.GameObjects.Sprite {

    hoverScale = 1.1
    defautScale = 1
    clickScale = 0.95


    constructor(scene, x, y, texture, frame, onClick) {
        super(scene, x, y, texture, frame);

        // Add to scene
        scene.add.existing(this);
        this.setInteractive({ useHandCursor: true });

        // Hover effect
        this.on('pointerover', () => {
            this.setTint(0xffff99); // light golden tint ✨
            this.setScale(this.hoverScale);     // zoom in
        });

        this.on('pointerout', () => {
            this.clearTint();
            this.setScale(this.defautScale);       // reset zoom
        });

        // Click effect
        this.on('pointerdown', () => {
            this.setScale(this.clickScale);    // zoom out a bit
        });

        this.on('pointerup', () => {
            this.setScale(this.hoverScale);     // return to hover zoom
            if (typeof onClick === 'function') {
                onClick();
            }
        });

        this.handleResize(this.scale.width)
        this.resizeCallback = (gameSize) => {
            this.handleResize(gameSize.width);
        };

        scene.scale.on('resize', this.resizeCallback);
    }
    handleResize(width) {
        const isMobile = width < 1024;
        this.hoverScale = isMobile ? 0.55 : 1.1
        this.defautScale = isMobile ? 0.5 : 1
        this.clickScale = isMobile ? 0.45 : 0.95
        this.setScale(this.defautScale)
    }


    destroy(fromScene) {
        this.removeAllListeners();
        super.destroy(fromScene);
    }
}
