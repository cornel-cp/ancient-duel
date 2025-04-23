import Phaser from 'phaser';
import { DeckCard } from '../../components/card/deck';
import { BaseScene } from '../base';
import { getDecks } from '../../../api';

export default class DeckSelect extends BaseScene {

    decks = []
    deckContainer
    currentIndex = 0
    btnLeft
    btnRight

    deckCard

    decks = []

    constructor() {
        super({
            name: 'DeckSelect',
            background: 'select:background'
        });
    }

    preload() {
        this.decks = getDecks()
        console.log("decks", this.decks)
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
        super.create()
    }

    createSliderControls() {
        const { width, height } = this.scale;

        this.leftButton = this.add.image(60, height / 2, 'leftArrow')
            .setInteractive()
            .on('pointerup', () => {
                if (this.currentIndex > 0) {
                    console.log("left")
                    this.currentIndex--;
                    this.deckCard.loadDeck(this.decks[this.currentIndex])
                }
            });

        this.rightButton = this.add.image(width - 60, height / 2, 'rightArrow')
            .setInteractive()
            .on('pointerup', () => {
                const maxIndex = this.decks.length - 1;
                console.log("right", this.currentIndex, maxIndex)
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
        }
    }
}
