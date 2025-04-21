import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { PokiPlugin } from '@poki/phaser-3'
//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver
    ],
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
                    gameplaySceneKey: 'PlayScene',
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

    return new Game({ ...config, parent });

}

export default StartGame;
