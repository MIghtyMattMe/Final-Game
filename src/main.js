/*
Final Game

Made by:
Roman Collazo
Michelle Kim
Zoey Laytart
Matthew Meacham

*/
let config = {
    type: Phaser.CANVAS,
    width: 980,
    height: 720,
    autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            fps: 60
        }
    },
    scene: [Menu, Store, Cart, Bagging]
}

let game = new Phaser.Game(config);

//UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
//keyboard vars
let keyLEFT, keyRIGHT, keySPACE;
//mouse
let pointer;

