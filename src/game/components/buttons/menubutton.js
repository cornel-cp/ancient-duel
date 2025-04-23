// components/MenuButton.ts
import Phaser from 'phaser';

export class MenuButton extends Phaser.GameObjects.Container {

  buttonSprite
  label
  resizeCallback
  constructor(
    scene,
    x,
    y,
    text,
    onClick
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    const { width } = scene.scale;
    const isMobile = width < 1024;

    const fontSize = isMobile ? '18px' : '32px';
    const scaleFactor = isMobile ? 0.6 : 1;

    this.buttonSprite = scene.add
      .sprite(0, 0, 'menuBtn', 'default')
      .setInteractive({ useHandCursor: true })
      .setScale(scaleFactor);

    this.label = scene.add
      .text(0, 0, text, {
        fontFamily: 'Arial',
        fontSize,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    this.add([this.buttonSprite, this.label]);

    // Interactivity
    this.buttonSprite.on('pointerover', () => {
      this.buttonSprite.setFrame('hover');
    });

    this.buttonSprite.on('pointerout', () => {
      this.buttonSprite.setFrame('default');
    });

    this.buttonSprite.on('pointerdown', () => {
      this.buttonSprite.setFrame('press');
    });

    this.buttonSprite.on('pointerup', () => {
      this.buttonSprite.setFrame('hover');
      onClick();
    });

    this.resizeCallback = (gameSize) => {
      this.handleResize(gameSize.width);
    };

    scene.scale.on('resize', this.resizeCallback);
  }

  handleResize(width) {
    const isMobile = width < 1024;
    const fontSize = isMobile ? '18px' : '32px';
    const scaleFactor = isMobile ? 0.6 : 1;

    this.label.setFontSize(fontSize);
    this.buttonSprite.setScale(scaleFactor);
  }

  
  destroy(fromScene) {
    this.scene.scale.off('resize', this.resizeCallback);
    super.destroy(fromScene);
  }
}
