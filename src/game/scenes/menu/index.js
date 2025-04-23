import { MenuButton } from "../../components/buttons/menubutton";
import { BaseScene } from "../base";

export class MainMenu extends BaseScene {


    buttons

    constructor() {
        super({
            name: 'MainMenu',
            background: 'menu:background'
        });
    }

    create() {
        const { width, height } = this.scale;
        const spacing = width < 1024 ? 80 : 150;
        // Create individual buttons
        const playButton = new MenuButton(this, 0, 0, 'Play', () => {
            this.scene.start('DeckSelect');
        });

        const optionsButton = new MenuButton(this, 0, 0, 'Options', () => {
            console.log('Options clicked');
        });

        const helpButton = new MenuButton(this, 0, 0, 'Help', () => {
            console.log('Help clicked');
        });
        this.buttons = [playButton, optionsButton, helpButton]

        this.buttons.forEach((btn, index) => {
            btn.y = index * spacing;
        });
        // Group them into a container (stacked vertically, centered around center)
        this.centerContainer = this.add.container(
            this.scale.width / 2,
            this.scale.height / 2 - (spacing * (this.buttons.length - 1)) / 2,
            this.buttons
        ).setDepth(1);
        super.create()
    }

    resize(gameSize) {
        const spacing = gameSize.width < 1024 ? 80 : 150;

        this.buttons.forEach((btn, i) => {
            btn.y = i * spacing;
        });

        this.centerContainer.setPosition(
            gameSize.width / 2,
            gameSize.height / 2 - (spacing * (this.buttons.length - 1)) / 2
        );
    }
}