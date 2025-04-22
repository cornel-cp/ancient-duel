export class DeckCard extends Phaser.GameObjects.Plane
{
    title;
    character;
    constructor (scene, x, y, texture, options)
    {
        super(scene, x, y, texture);

        this.scene.add.existing(this);

        // Character
        this.character = scene.add.image(x, y, options.characterTexture).setAlpha(0);
        // Title
        this.title = scene.add.image(x, y + 100, options.titleTexture);

    }

    moveCard ()
    {
        this.scene.add.tween({
            targets: this,
            duration: 300,
            rotateX: -35,
            onStart: () => {
                // Title movement
                this.scene.add.tween({
                    targets: this.title,
                    duration: 300,
                    y: this.y + 80
                });
                // Character movement
                this.scene.add.tween({
                    targets: this.character,
                    duration: 300,
                    y: this.y - 50,
                    alpha: 1

                });

                this.scene.tweens.addCounter({
                    from: 255,
                    to: 100,
                    duration: 300,
                    onUpdate: (tween) => {
                        const value = Math.floor(tween.getValue());
                        this.setTint(Phaser.Display.Color.GetColor(value, value, value));
                    }
                })
            }
        });
    }

    restoreMove ()
    {
        this.scene.add.tween({
            targets: this,
            duration: 300,
            rotateX: 0,
            onStart: () => {
                // Title movement
                this.scene.add.tween({
                    targets: this.title,
                    duration: 300,
                    y: this.y + 100
                });

                // Character movement
                this.scene.add.tween({
                    targets: this.character,
                    duration: 300,
                    y: this.y,
                    alpha: 0

                });

                this.scene.tweens.addCounter({
                    from: 100,
                    to: 255,
                    duration: 300,
                    onUpdate: (tween) => {
                        const value = Math.floor(tween.getValue());
                        this.setTint(Phaser.Display.Color.GetColor(value, value, value));
                    }
                })
            }
        });
    }
}