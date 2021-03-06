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
            //gravity: {y: 400},
            fps: 60
        }
    },
    scene: [Menu, Cart, Bagging, End, StoreAisleL, StoreAisleR, StoreAisleDairy, StoreAisleChips, StoreAisleCereal, Credits, Help]
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
//music
let menu_music;
//current scene
let curScene;
//list group
let list = [];
let listEgg, listMilk, listChips, listCereal;
let alphaNumM = 0;
let alphaNumE = 0;
let alphaNumCe = 0;
let alphaNumCh = 0;

