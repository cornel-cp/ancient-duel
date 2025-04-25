import { getCards } from "../../../api";
import { GameCard } from "../../components/card/gamecard";
import { BaseScene } from "../base";

const slidingDeceleration = 5000;
const backDeceleration = 2000;


export class SelectCard extends BaseScene {

    cards = []

    constructor() {
        super({
            name: 'SelectCard',
            background: 'menu:background'
        });
    }

    preload() {
        this.cards = getCards()
    }

    create() {
        const pad = Phaser.Utils.String.Pad;
        // const { width, height } = this.scale;
        super.create()



        // Phaser.Actions.GridAlign(gameCards, {
        //     width: cols,
        //     height: rows,
        //     cellWidth: 150,
        //     cellHeight: 200,
        //     x: 100,
        //     y: 100
        // });

        // const totalRows = Math.ceil(this.cards.length / cols);
        // gridContainer.setSize(this.scale.width, totalRows * 200 + padding);

        // const maskShape = this.make.graphics();
        // maskShape.fillStyle(0xffffff).fillRect(0, 0, this.scale.width, 600);
        // gridContainer.setMask(maskShape.createGeometryMask());


        // // Drag to scroll
        // this.input.on('pointermove', (pointer) => {
        //     if (pointer.isDown) {
        //         gridContainer.y += pointer.velocity.y * 0.1;
        //         // Clamp scroll so you don’t scroll past top or bottom
        //         const maxY = 0;
        //         const minY = Math.min(-gridContainer.height + 600, 0);
        //         gridContainer.y = Phaser.Math.Clamp(gridContainer.y, minY, maxY);
        //     }
        // });

        let screenWidth = this.scale.width;
        let colCount = 4;
        let topPadding = 40;

        if (screenWidth > 1600) {
            colCount = 10;
            topPadding = 100;
        } else if (screenWidth > 1366) {
            colCount = 8;
            topPadding = 100
        } else if (screenWidth > 1024) {
            colCount = 6;
            topPadding = 100;
        }

        var snapStep = 75;
        var x = 400,
            y = topPadding,
            w = this.scale.width - 200,
            h = this.scale.height;
        var topY = y - (h / 2),
            leftX = (w / 2);
        var bg = this.add.graphics()
            .setPosition(100, topPadding)
            .fillStyle(0x00003300, 0.3)
            .fillRect(0, 0, w, h - 2 * topPadding)
            .setInteractive(new Phaser.Geom.Rectangle(0, 0, w, h),
                Phaser.Geom.Rectangle.Contains);


        var s = '';
        for (var i = 0, cnt = 300; i < cnt; i++) {
            s += pad(i.toString(), 4, '0', 1);
            if (i < (cnt - 1)) {
                s += '\n';
            }
        }


        // const rows = 4;
        // const cols = 5;
        // const padding = 10;
        // let index = 0;

        const gridPadding = 100;  // Left + right = 200 total
        const gridGap = 20;
        const gridWidth = screenWidth - gridPadding * 2;

        const totalGap = (colCount - 1) * gridGap;
        const cardWidth = (gridWidth - totalGap) / colCount;
        const cardHeight = cardWidth * 3 / 2;


        const gridContainer = this.add.container(0, 100); // Positioned with some top margin

        const totalRows = Math.ceil(this.cards.length / colCount);
        const totalHeight = totalRows * cardHeight + (totalRows - 1) * gridGap;
        for (let i = 0; i < this.cards.length; i++) {
            const row = Math.floor(i / colCount);
            const col = i % colCount;

            const x = gridPadding + col * (cardWidth + gridGap);
            const y = row * (cardHeight + gridGap);
            const baseCardWidth = 400; // use your design base
            const scale = cardWidth / baseCardWidth;
            const card = new GameCard(this, 0, 0, this.cards[i]);
            // card.setOrigin(0, 0)
            card.setScale(scale)
            // card.setDisplaySize(cardWidth, cardHeight);
            card.setPosition(x, y); // Set position within container
            gridContainer.add(card);
        }
        // var txt = this.add.text(leftX, topY, s);
        gridContainer.setMask(bg.createGeometryMask());
        const bounds = gridContainer.getBounds();
        console.log("Grid width:", bounds.width);
        console.log("Grid height:", bounds.height);
        // const containeBg = this.add.graphics();
        // containeBg.fillStyle(0xFF2244, 0.5); // (color, alpha)
        // containeBg.fillRect(0, 0, bounds.width, bounds.heigh); 
        // gridContainer.addAt(bg, 0);
        console.log(gridContainer.x, gridContainer.y, gridContainer.width, gridContainer.height);

        const scrollAreaHeight = h;
        const contentHeight = bounds.height;
        const bottomBound = Math.min(scrollAreaHeight - contentHeight - topPadding, 0);


        this.scroller = this.plugins.get('rexScroller').add(bg, {
            bounds: [
                bottomBound,
                topPadding
            ],
            value: topPadding,
            slidingDeceleration: slidingDeceleration,
            backDeceleration: backDeceleration,
            snapStep: snapStep,

            valuechangeCallback: function (newValue) {
                gridContainer.y = newValue;
            }
        });

        this.scrollerState = this.add.text(0, 0, '');
    }

    resize(gameSize) {

    }

    update() {
        this.scrollerState.text = this.scroller.state + "\n" + this.scroller.value;
    }
}