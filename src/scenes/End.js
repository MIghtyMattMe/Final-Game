class End extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    preload() {
        this.load.image("menu_bg", "./assets/menu/menu_bg.png");
        this.load.audio('menu_music', './assets/Music/Menu_Music.wav');
        this.load.audio('game_music', './assets/Music/Game_Music.wav');
    }

    create() {
        this.bg = this.add.tileSprite(0,0, 980, 720, "menu_bg").setOrigin(0,0).setAlpha(0.5);


        //mouse controls
        pointer = this.input.activePointer;
        this.input.mouse.disableContextMenu();

        //load music
        this.game.sound.stopAll();
        menu_music.play();  

        //calc the cost of groceries
        let cart_cost = 0;
        for (let i = 0; i < cart.length; i++) {
            cart_cost += cart[i].cost;
        }

        //temporary change between scenes & text
        /*let keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        keySPACE.on('down', (event) => {
            this.scene.start('menuScene');
        });*/

        let txt = this.add.text(120, 140, "Left click to go back to menu");
        let txt2 = this.add.text(120, 200, "Total cost: $" + cart_cost);
        this.end = false;
        this.ending();
    }

    update() {
        if(pointer.isDown && this.end){
            cart = [];
            this.scene.start('menuScene');
        }
    }

    ending() {
        this.clock = this.time.delayedCall(500, () => {
            this.end = true;
        }, null, this);
    }
}