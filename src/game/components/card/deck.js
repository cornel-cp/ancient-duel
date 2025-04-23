export class DeckCard extends Phaser.GameObjects.Plane {
    title;
    character;
    resizeCallback;
    deck

    constructor(scene, x, y, deck) {
        super(scene, x, y, deck.texture);
        this.deck = deck;
        this.scene.add.existing(this);
        this.character = scene.add.image(this.x, this.y, this.deck.character);
        // Title
        this.title = scene.add.image(this.x, this.y + this.scale.width > 1024 ? 200 : 100, this.deck.title);
        this.handleResize({ width: scene.scale.width, height: scene.scale.height });
        this.loadDeck(deck);
        this.resizeCallback = (gameSize) => {
            this.handleResize(gameSize);
        };
        scene.scale.on('resize', this.resizeCallback);
    }

    loadDeck(deck) {
        this.deck = deck;
        console.log(deck)
        this.setTexture(deck.texture);
        // Character
        this.character.setTexture(deck.character);
        // Title
        this.title.setTexture(deck.title);
    }

    moveCard() {
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

    restoreMove() {
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

    handleResize(gameSize) {
        const { width, height } = gameSize;
        this.setY(height / 2);
        this.setScale(width > 1024 ? 1 : 0.5);
        this.character.setScale(width > 1024 ? 1 : 0.5);
        this.character.setPosition(this.x, this.y);
        this.title.setX(width / 2)
        console.log(this.y , this.character.height/2 , width > 1024 ? 200 : 100)
        this.title.setScale(width > 1024 ? 1.5 : 1);
        // this.character.setSize(width / 4, width / 4 * 4 / 3);
    }
}