export class GameCard extends Phaser.GameObjects.Container {
    plane;
    character;
    nameText;
    descriptionText;
    attackValue;
    card;
    resizeCallback;

    constructor(scene, x, y, card) {
        super(scene, x, y); // Container base class

        this.card = card;

        // === Frame ===
        this.plane = scene.add.image(0, 0, "gamecard");
        this.plane.setFrame(this.getFrame(card.level));
        this.plane.setOrigin(0, 0);


        // === Character Image ===
        this.character = scene.add.image(0, 0, card.texture);
        this.character.setOrigin(0.5);
        this.character.setPosition(this.plane.width / 2, this.plane.height * 0.4); // approx upper half

        // === Name Text ===
        this.nameText = scene.add.text(0, 0, card.name || 'UNKNOWN', {
            fontSize: '20px',
            fontFamily: 'Georgia',
            color: '#000',
            fontStyle: 'bold'
        }).setOrigin(0.5, 0.5);

        // === Description Text ===
        this.descriptionText = scene.add.text(0, 0, card.description || '', {
            fontSize: '20px',
            fontFamily: 'Georgia',
            color: '#000',
            wordWrap: { width: this.plane.width * 0.9 }
        }).setOrigin(0.5, 0);

        // === Attack Value ===
        this.attackValue = scene.add.text(0, 0, card.poitn?.toString() || '0', {
            fontSize: '48px',
            fontFamily: 'Georgia',
            color: '#f8e36a',
            fontStyle: 'bold',
            backgroundColor: '#00000055',
            padding: { x: 8, y: 4 }
        }).setOrigin(1, 1); // bottom-right

        // Add everything
        this.add([
            this.character,
            this.plane,
            this.nameText,
            this.descriptionText,
            this.attackValue
        ]);

        // Add to scene
        scene.add.existing(this);

        // Layout
        this.layout();

        // Handle resize
        this.resizeCallback = (gameSize) => this.handleResize(gameSize);
        scene.scale.on('resize', this.resizeCallback);
        this.handleResize(scene.scale); // init
    }

    getFrame(level) {
        switch (level) {
            case 1: return 'gray';
            case 2: return 'green';
            case 3: return 'blue';
            case 4: return 'purple';
            case 5: return 'red';
            default: return 'gray';
        }
    }
    layout() {
        // Place nameText at top center
        this.nameText.setPosition(this.plane.width / 2, this.plane.height * 0.78);

        // Place description in lower section
        this.descriptionText.setPosition(this.plane.width / 2, this.plane.height * 0.82);

        // Place attack bottom right
        this.attackValue.setPosition(this.plane.width - 12, this.plane.height - 12);
    }

    handleResize(gameSize) {
        const { width } = gameSize;

        // Calculate scaling size for responsive layout
        const cardBaseWidth = 300;
        const desiredWidth = width < 1024 ? 180 : 240;
        const scale = desiredWidth / cardBaseWidth;

        // this.setScale(scale);
    }

    destroy(fromScene) {
        this.scene.scale.off('resize', this.resizeCallback);
        super.destroy(fromScene);
    }
}
