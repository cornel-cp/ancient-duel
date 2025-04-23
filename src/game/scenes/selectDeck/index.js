import Phaser from 'phaser';
import { DeckCard } from '../../components/card/deck';
import { BaseScene } from '../base';

export default class DeckSelect extends BaseScene {
    constructor() {
        super({
            name: 'DeckSelect',
            background: 'select:background'
        });
    }


    create() {
        const { width, height } = this.scale;

        // const decks = ['Monsters', 'Skellige', 'Nilfgaard', 'Northern Realms', 'Scoia\'tael', 'Extra Deck 1', 'Extra Deck 2'];
        // const cards = Array.from({ length: 40 });

        // // Create Deck Panel
        // const deckContainer = this.add.container(0, 0);
        // decks.forEach((name, i) => {
        //   const y = i * 60;
        //   const btn = this.add.text(20, y, name, { fontSize: '20px', color: '#fff' }).setInteractive();
        //   deckContainer.add(btn);
        // });

        // const maskShape = this.make.graphics();
        // maskShape.fillRect(0, 0, 200, 600);
        // const deckMask = maskShape.createGeometryMask();
        // deckContainer.setMask(deckMask);

        // // Add deck scroll
        // this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
        //   deckContainer.y -= deltaY * 0.5;
        //   deckContainer.y = Phaser.Math.Clamp(deckContainer.y, -decks.length * 60 + 600, 0);
        // });

        // // Create Card Grid
        // const cardContainer = this.add.container(220, 0);
        // const columns = 8;
        // const spacing = 10;

        // cards.forEach((_, i) => {
        //   const x = (i % columns) * (100 + spacing);
        //   const y = Math.floor(i / columns) * (140 + spacing);
        //   const card = this.add.image(x, y, 'card').setDisplaySize(100, 140).setInteractive();
        //   cardContainer.add(card);
        // });

        // const cardMaskShape = this.make.graphics();
        // cardMaskShape.fillRect(220, 0, 580, 600);
        // const cardMask = cardMaskShape.createGeometryMask();
        // cardContainer.setMask(cardMask);

        // // Card grid scroll
        // this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
        //   if (pointer.x > 220) {
        //     cardContainer.y -= deltaY * 0.5;
        //     cardContainer.y = Phaser.Math.Clamp(cardContainer.y, -Math.ceil(cards.length / columns) * 150 + 600, 0);
        //   }
        // });

        let previouseCard = null;

        const romeDeck = new DeckCard(this, 0, this.scale.height - this.scale.height/2, "romedeck", {
            titleTexture: "romedeck_title",
            characterTexture: "rome_general"
        })
        const greekDeck = new DeckCard(this, 600 , this.scale.height - this.scale.height/2, "greecedeck", {
            titleTexture: "greecedeck_title",
            characterTexture: "greece_general"
        })
        const planes = [
            romeDeck, greekDeck
        ];

        this.centerContainer = this.add.container(width / 2, height / 2 - 150, [
            romeDeck, greekDeck
        ]).setDepth(1);

        this.input.on(Phaser.Input.Events.POINTER_MOVE, (pointer) => {
            const { x, y } = pointer;
            const card = planes.find(card => card.hasFaceAt(x, y));

            if (card) {
                if (!previouseCard && previouseCard !== card) {
                    card.moveCard();
                    previouseCard = card;

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
}
