import Phaser from 'phaser';
import { DeckCard } from '../../components/card/deck';
import { BaseScene } from '../base';

export default class DeckSelect extends BaseScene {

    decks = []
    deckContainer
    currentIndex
    btnLeft
    btnRight


    constructor() {
        super({
            name: 'DeckSelect',
            background: 'select:background'
        });
    }


    create() {
        const { width, height } = this.scale;

        this.deckContainer = this.add.container(width / 2, height / 2);

        this.createDeckCards();
        this.createSliderControls();
        this.resize();

        this.input.on('pointerup', () => {
            this.resize();
        });


        let previouseCard = null;

        // this.input.on(Phaser.Input.Events.POINTER_MOVE, (pointer) => {
        //     const { x, y } = pointer;
        //     const card = planes.find(card => card.hasFaceAt(x, y));

        //     if (card) {
        //         if (!previouseCard && previouseCard !== card) {
        //             card.moveCard();
        //             previouseCard = card;

        //         }
        //     } else {
        //         if (previouseCard) {
        //             const card = previouseCard;
        //             card.restoreMove();
        //             previouseCard = null;
        //         }
        //     }
        // });
        super.create()
    }

    createDeckCards() {
        // Create mock decks for now
        for (let i = 0; i < 12; i++) {
            const romeDeck = new DeckCard(this, 0, this.scale.height - this.scale.height / 2, "romedeck", {
                titleTexture: "romedeck_title",
                characterTexture: "rome_general"
            })
            const greekDeck = new DeckCard(this, 600, this.scale.height - this.scale.height / 2, "greecedeck", {
                titleTexture: "greecedeck_title",
                characterTexture: "greece_general"
            })
            this.decks.push(i % 2 === 1 ? romeDeck : greekDeck);
        }
    }

    createSliderControls() {
        const { width, height } = this.scale;

        this.leftButton = this.add.image(60, height / 2, 'leftArrow')
            .setInteractive()
            .on('pointerup', () => {
                if (this.currentIndex > 0) {
                    this.currentIndex--;
                    this.updateDeckDisplay();
                }
            });

        this.rightButton = this.add.image(width - 60, height / 2, 'rightArrow')
            .setInteractive()
            .on('pointerup', () => {
                const maxIndex = this.decks.length - this.getVisibleDeckCount();
                if (this.currentIndex < maxIndex) {
                    this.currentIndex++;
                    this.updateDeckDisplay();
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
        const visibleCount = this.getVisibleDeckCount();
        const spacing = 200;
        const startX = -(spacing * (visibleCount - 1)) / 2;

        this.deckContainer.removeAll(true);

        for (let i = 0; i < visibleCount; i++) {
            const index = this.currentIndex + i;
            if (index < this.decks.length) {
                const deck = this.decks[index];
                deck.x = startX + i * spacing;
                deck.y = 0;
                this.deckContainer.add(deck);
            }
        }
    }
}
