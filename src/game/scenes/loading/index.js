import { Scene } from 'phaser';
import { ASEPRITE, ASSETS, DECKS } from './assets';

const BAR_X = 59;
const BAR_Y = 29;

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }
    loaded = false
    // === Background blue controller ===
    fx = null


    preload() {
        //  Load the assets for the game - Replace with your own assets

        this.load.setPath("assets/images/ui/loading");
        this.load.setPrefix("ui-loading:");
        this.load.image("background", "background.jpg");
        this.load.image("bar-background", "bar-background.png");
        this.load.image("bar", "bar.png");

        this.load.setPath();
        this.load.setPrefix();

    }

    postload() {
        this.load.baseURL = 'assets/images/';

        DECKS.forEach((item) => {
            console.log(item)
            item.cards.forEach((card) => {
                console.log(card)
                this.load.image(card.key, `cards/${item.path}/${card.url}`);
            })
        })

        ASEPRITE.forEach((item) => {
            this.load.aseprite(item.name, `${item.path}/${item.image}`, `${item.path}/${item.json}`)
        })

        ASSETS.forEach((item) => {
            this.load.image(item.name, `${item.path}/${item.image}`)
        })

        this.load.start();
    }

    create() {
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.load.off(Phaser.Loader.Events.PROGRESS, this.onLoaderProgress, this);
            this.load.off(Phaser.Loader.Events.FILE_PROGRESS, this.onLoaderFileProgress, this);
            this.load.off(Phaser.Loader.Events.COMPLETE, this.onLoaderComplete, this);
        });
        this.load.on(Phaser.Loader.Events.PROGRESS, this.onLoaderProgress, this);
        this.load.on(Phaser.Loader.Events.FILE_PROGRESS, this.onLoaderFileProgress, this);
        this.load.on(Phaser.Loader.Events.COMPLETE, this.onLoaderComplete, this);

        this.createBar();
        this.postload();
        this.initListener();
    }

    update() {
        const { width, height } = this.scale;
    }

    createBar() {
        const { width, height } = this.scale;
        // === Background ===
        const bg = this.add.image(width / 2, height / 2, 'ui-loading:background').setOrigin(0.5).setName("bg");
        const originalBgW = bg.width;
        const originalBgH = bg.height;
        this.fx = bg.preFX.addBlur();
        // this.tweens.add({
        //     targets: fx,
        //     strength: 0,
        //     duration: 3000,
        // });
        bg.setScale(Math.max(width / originalBgW, height / originalBgH));
        // === Loading Bar Background ===
        const barBg = this.add.image(0, 0, "ui-loading:bar-background")
        barBg.setOrigin(0)
            .setScale(Math.min((width * 0.75) / barBg.width, 1));
        barBg.setPosition(width / 2 - barBg.displayWidth / 2, height / 2 - barBg.displayHeight / 2);
        // === Foreground Bar ===
        const bar = this.add.image(0, 0, "ui-loading:bar")
            .setOrigin(0)
            .setScale(barBg.scale)
            .setPosition(
                barBg.x + BAR_X * barBg.scale,
                barBg.y + BAR_Y * barBg.scale
            )
            .setName("bar");

        // === Mask ===
        const maskGfx = this.add.graphics().setVisible(false).setName("mask");
        maskGfx.fillRect(bar.x, bar.y, 0, bar.displayHeight);
        bar.setMask(maskGfx.createGeometryMask());

        // === Title ===
        const title = this.add.text(
            bar.x + bar.displayWidth / 2,
            bar.y + bar.displayHeight / 2,
            ""
        ).setOrigin(0.5).setFontSize(18).setName("title");

        const start = this.add.text(
            bar.x + bar.displayWidth / 2,
            bar.y + bar.displayHeight / 2 + 80,
            "Press SPACE bar to start"
        ).setFontSize(36).setOrigin(0.5)

        // === Responsive Resize Handling ===
        this.scale.on('resize', ({ width, height }) => {
            bg.setPosition(width / 2, height / 2);
            bg.setScale(Math.max(width / originalBgW, height / originalBgH));

            if (barBg) {
                barBg.setScale(Math.min((width * 0.75) / barBg.width, 1));
                barBg.setPosition(width / 2 - barBg.displayWidth / 2, height / 2 - barBg.displayHeight / 2);

                bar.setScale(barBg.scale);
                bar.setPosition(
                    barBg.x + BAR_X * barBg.scale,
                    barBg.y + BAR_Y * barBg.scale
                );

                maskGfx.clear();
                maskGfx.fillRect(bar.x, bar.y, bar.displayWidth, bar.displayHeight);
                start.setPosition(bar.x + bar.displayWidth / 2, bar.y + bar.displayHeight / 2 + 80);
                title.setPosition(bar.x + bar.displayWidth / 2, bar.y + bar.displayHeight / 2);
                start.setVisible(this.loaded ? true : false)
            }
        });


    }

    initListener() {
        this.input.keyboard.on('keydown-SPACE', () => {
            if(this.loaded) {
                this.scene.start('MainMenu');
            }
        });
    }

    onLoaderProgress(progress) {
        console.log(progress)
        const bar = this.children.getByName("bar");
        const mask = this.children.getByName("mask");
        mask.clear();
        mask.fillRect(bar.x, bar.y, progress * bar.displayWidth, bar.height);
        this.fx.strength = 1 - progress;
    }

    onLoaderFileProgress(file, progress) {
        const title = this.children.getByName("title");
        // title.setText(`${file.key.split("/").pop()} ${Math.floor(progress * 100)}%`);
        title.setText(`${Math.floor(progress * 100)}`);
    }

    async onLoaderComplete() {
        this.loaded = true
    }
}
