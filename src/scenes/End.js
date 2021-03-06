class End extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    preload() {
        this.load.image("menu_bg", "./assets/menu/menu_bg.png");
        this.load.audio('menu_music', './assets/Music/Menu_Music.mp3');
        this.load.audio('game_music', './assets/Music/Game_Music.mp3');

        //player atlas
        this.load.atlas("player", "./assets/shop/playerAtlas.png", "./assets/shop/player.json");
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

        this.anims.create({key: "walking", frames: this.anims.generateFrameNames("player", {prefix: "walking", end: 1, zeroPad:3}), frameRate:4, repeat:-1});
        player = new Player(this, game.config.width/2, game.config.height-(180*1.3), "player").setDepth(1).setScale(.45);
        player.body.allowGravity = false;
        player.anims.play("walking", true);

        let txt = this.add.text(490, 200, "Click the screen to go back to the menu", {fontSize: '36px', strokeThickness: 1}).setOrigin(0.5);
        let txt2 = this.add.text(490, 140, "You Spent: $" + (Math.floor(cart_cost*100)/100).toFixed(2), {fontSize: '36px', strokeThickness: 1}).setOrigin(0.5);
        
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