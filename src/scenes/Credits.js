class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {
        this.load.image("menu_bg", "./assets/menu/sky.png");
        this.load.image("clouds", "./assets/menu/clouds.png");
        this.load.image("mart", "./assets/menu/mart.png");
        this.load.image("back", "./assets/menu/text_bg.png");
        this.load.image("butt", "./assets/cart/back_button.png");
    }

    create() {
        this.bg = this.add.tileSprite(0,0, 980, 720, "menu_bg").setOrigin(0,0);
        this.clouds = this.add.tileSprite(0,0, 980, 720, "clouds").setOrigin(0,0);
        this.mart = this.add.tileSprite(0,0, 980, 720, "mart").setOrigin(0,0);
        this.text_bg = this.add.sprite(110, 50, "back").setOrigin(0).setAlpha(0.8);

        this.add.text(160, 100, "This game was made as a part of \nUC Santa Cruz classes ARTG 120 \nand CMPM 120.\n\nArtists:\n\tZoey Laytart\n\tRoman Collazo\n\tMichelle Kim\n\nProgrammers:\n\tMatthew Meacham\n\tMichelle Kim", {fontSize: '36px', strokeThickness: 1});

        let back_butt = this.add.sprite(65, 25, "butt").setOrigin(0, 0).setInteractive().setScale(0.2).on('pointerdown', () => {
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