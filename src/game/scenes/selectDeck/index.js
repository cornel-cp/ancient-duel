import Phaser from 'phaser';
import { DeckCard } from '../../components/card/deck';
import { BaseScene } from '../base';
import { getDecks } from '../../../api';
import { MenuButton } from '../../components/buttons/menubutton';
import { Button } from '../../components/buttons/button';

export default class DeckSelect extends BaseScene {

    decks = []
    deckContainer
    currentIndex = 0
    btnLeft
    btnRight

    deckCard

    decks = []
    btnStart

    constructor() {
        super({
            name: 'DeckSelect',
            background: 'select:background'
        });
    }

    preload() {
        this.decks = getDecks()
    }


    create() {
        const { width, height } = this.scale;

        this.deckContainer = this.add.container(width / 2, height / 2);

        // this.createDeckCards();
        this.createSliderControls();

        let previouseCard = null;
        this.deckCard = new DeckCard(this, this.scale.width / 2, this.scale.height - this.scale.height / 2, this.decks[0])
        this.input.on(Phaser.Input.Events.POINTER_MOVE, (pointer) => {
            const { x, y } = pointer;
            if (this.deckCard.hasFaceAt(x, y)) {
                if (previouseCard !== this.deckCard) {
                    this.deckCard.moveCard();
                    previouseCard = this.deckCard;
                }
            } else {
                if (previouseCard) {
                    const card = previouseCard;
                    card.restoreMove();
                    previouseCard = null;
                }
            }
        });
        this.btnStart = new MenuButton(this, this.scale.width - (this.scale.width > 1024 ? 200 : 100), this.scale.height - 60, 'Start', () => {
            console.log('Help clicked');
        }).setScale(0.4);
        super.create()
    }

    createSliderControls() {
        const { width, height } = this.scale;

        this.leftButton = new Button(this, 60, height / 2, 'button', "left", () => {
            const maxIndex = this.decks.length - 1;
            if (this.currentIndex < maxIndex) {
                this.currentIndex++;
                this.deckCard.loadDeck(this.decks[this.currentIndex])
            }
        })

        this.rightButton = new Button(this, width - 60, height / 2, 'button', "right", () => {
            const maxIndex = this.decks.length - 1;
            if (this.currentIndex < maxIndex) {
                this.currentIndex++;
                this.deckCard.loadDeck(this.decks[this.currentIndex])
            }
        });
    }

    getVisibleDeckCount() {
        const width = this.scale.width;
        if (width < 768) return 1;
        if (width < 1200) return 2;
        return 3;
    }

    resize(gameSize) {
        if (this.deckCard && gameSize)
            this.deckCard.setPosition(gameSize.width / 2, gameSize.height / 2)
        if (gameSize) {
            this.leftButton.setPosition(60, gameSize.height / 2);
            this.rightButton.setPosition(gameSize.width - 60, gameSize.height / 2);
            this.btnStart.setPosition(gameSize.width - (gameSize.width > 1024 ? 200 : 100), gameSize.height - 60);
        }
    }
}
