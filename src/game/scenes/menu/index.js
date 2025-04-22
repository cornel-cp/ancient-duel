import { Scene } from "phaser";
import { MenuButton } from "../../components/buttons/menubutton";

export class MainMenu extends Scene {

    buttonContainer

    constructor() {
        super('MainMenu');
    }

    create() {
        const { width, height } = this.scale;
        const bg = this.add.image(width / 2, height / 2, 'menu:background').setOrigin(0.5);
        const originalBgW = bg.width;
        const originalBgH = bg.height;
        bg.setScale(Math.max(width / originalBgW, height / originalBgH));
        // Create individual buttons
        const playButton = new MenuButton(this, 0, 0, 'Play', () => {
            this.scene.start('DeckSelect');
        });

        const optionsButton = new MenuButton(this, 0, 150, 'Options', () => {
            console.log('Options clicked');
        });

        const helpButton = new MenuButton(this, 0, 300, 'Help', () => {
            console.log('Help clicked');
        });

        // Group them into a container (stacked vertically, centered around center)
        this.buttonContainer = this.add.container(width / 2, height / 2 - 150, [
            playButton,
            optionsButton,
            helpButton
        ]);

        this.scale.on('resize', ({ width, height }) => {
            bg.setPosition(width / 2, height / 2);
            bg.setScale(Math.max(width / originalBgW, height / originalBgH));
        });
        
        // Listen for resize
        this.scale.on('resize', this.resize, this);
    }

    resize(gameSize) {
        const { width, height } = gameSize;
        this.buttonContainer.setPosition(width / 2, height / 2 - 150);
    }
}