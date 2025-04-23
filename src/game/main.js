import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { PokiPlugin } from '@poki/phaser-3'
import { Preloader } from './scenes/loading';
import { MainMenu } from './scenes/menu';
import DeckSelect from './scenes/selectDeck';
import { AUTO, Game, Scale, Types, WEBGL } from 'phaser';

window.sizeChanged = () => {
    if (window.game.isBooted) {
        setTimeout(() => {
            window.game.scale.resize(window.innerWidth, window.innerHeight);
            window.game.canvas.setAttribute(
                'style',
                `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,
            );
        }, 100);
    }
};
window.onresize = () => window.sizeChanged();

const config = {
    type: AUTO,
    width: window.innerWidth,
    height:  window.innerHeight,
    parent: 'game-container',
    backgroundColor: '#028af8',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },
    scale: {
        mode: Scale.ScaleModes.NONE,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver,
        DeckSelect
    ],
    callbacks: {
        postBoot: () => {
            window.sizeChanged();
        },
    },
    plugins: {
        global: [
            {
                plugin: PokiPlugin,
                key: 'poki',
                start: true, // must be true, in order to load
                data: {
                    // This must be the key/name of your loading scene
                    loadingSceneKey: 'LoadingScene',
                    // This must be the key/name of your game (gameplay) scene
                    gameplaySceneKey: 'MainMenu',
                    // This will always request a commercialBreak when gameplay starts,
                    // set to false to disable this behaviour (recommended to have true,
                    // see Poki SDK docs for more details).
                    autoCommercialBreak: true
                }
            }
        ]
    }
};



const StartGame = (parent) => {
    const game = new Game({ ...config, parent })
    window.game = game
    return game;

}

export default StartGame;
