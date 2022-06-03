class Help extends Phaser.Scene {
    constructor() {
        super("helpScene");
    }
    
    preload() {
        this.load.image("menu_bg", "./assets/menu/sky.png");
        this.load.image("clouds", "./assets/menu/clouds.png");
        this.load.image("mart", "./assets/menu/mart.png");
        this.load.image("back", "./assets/menu/text_bg.png");
        this.load.image("hlp", "./assets/menu/help_bg.png");
        this.load.image("butt", "./assets/cart/back_button.png");
    }

    create() {
        this.bg = this.add.tileSprite(0,0, 980, 720, "menu_bg").setOrigin(0,0);
        this.clouds = this.add.tileSprite(0,0, 980, 720, "clouds").setOrigin(0,0);
        this.mart = this.add.tileSprite(0,0, 980, 720, "mart").setOrigin(0,0);
        this.add.sprite(110, 50, "back").setOrigin(0).setAlpha(0.8);
        this.add.sprite(110, 50, "hlp").setOrigin(0).setAlpha(0.8);

        let back_butt = this.add.sprite(8.9, 0, "butt").setScale(0.16).setOrigin(0, 0).setInteractive().on('pointerdown', () => {
            this.scene.start("menuScene");
        });


        //mouse controls
        pointer = this.input.activePointer;
        this.input.mouse.disableContextMenu();
    }

    update() {
        this.clouds.tilePositionX += 0.5;
    }
}