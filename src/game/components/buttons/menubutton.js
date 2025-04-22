// components/MenuButton.ts
import Phaser from 'phaser';

export class MenuButton extends Phaser.GameObjects.Container {
  constructor(
    scene,
    x,
    y,
    text,
    onClick
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    const buttonSprite = scene.add.sprite(0, 0, 'menuBtn', 'default').setInteractive({ useHandCursor: true });

    const label = scene.add.text(0, 0, text, {
      fontFamily: 'Arial',
      fontSize: '32px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    this.add([buttonSprite, label]);

    // Interactivity
    buttonSprite.on('pointerover', () => {
      buttonSprite.setFrame('hover');
    });

    buttonSprite.on('pointerout', () => {
      buttonSprite.setFrame('default');
    });

    buttonSprite.on('pointerdown', () => {
      buttonSprite.setFrame('press');
    });

    buttonSprite.on('pointerup', () => {
      buttonSprite.setFrame('hover');
      onClick();
    });
  }
}
