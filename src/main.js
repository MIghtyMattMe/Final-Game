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
            debug: true,
            //gravity: {y: 400},
            fps: 60
        }
    },
    scene: [Menu, Cart, Bagging, End, StoreAisleL, StoreAisleR, StoreAisleDairy, StoreAisleChips, StoreAisleCereal]
}

let game = new Phaser.Game(config);

//UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
//keyboard vars
let keyLEFT, keyRIGHT, keySPACE;
//mouse
let pointer;
//player cart
let player;
//shoping cart
let cart = [];
let new_cart_item;
//shopping list
let list = ["Cereal", "Cereal_x2"];
//music
let menu_music;

