//store right aisle

class StoreAisleR extends Phaser.Scene {
    constructor() {
        super("storeAisleRScene");

    }

    preload() {
        this.load.image("aisleRbg", "./assets/shop/bgs/aisle_right.png");
        
        //list assets
        this.load.image("List", "./assets/shop/list/list.png");
        this.load.image("list_milk", "./assets/shop/list/list_milk.png");
        this.load.image("list_eggs", "./assets/shop/list/list_eggs.png");
        this.load.image("list_chips", "./assets/shop/list/list_chips.png");
        this.load.image("list_cereal", "./assets/shop/list/list_cereal.png");

        this.load.image("collider", "./assets/shop/collider.png");

        //temp buttons for navigation
        this.load.image("cart_button", "./assets/shop/cart_button.png");
        this.load.image("list_button", "./assets/shop/list_button.png");

        //arrows
        this.load.image("button_left", "./assets/shop/bgs/button_left.png");
        this.load.image("button_right", "./assets/shop/bgs/button_right.png");

    }

    create() {
        curScene = "storeAisleRScene";
        //background, shelf, and cart button declaration 
        this.bg = this.add.tileSprite(0,0, 980, 720, "aisleRbg").setOrigin(0,0);

        let cart_butt = this.add.sprite(500, 30, "cart_button").setOrigin(0, 0).setInteractive().on('pointerdown', () => {
            this.scene.start('cartScene');
        });

        //hidden arrow buttons
        this.leftButton = this.add.sprite(-40, 60, "button_left").setOrigin(0,0).setScale(.70).setInteractive().on("pointerdown", ()=> {
            this.scene.start("storeAisleChipsScene");
        });
        this.leftButton2 = this.add.sprite(250, 70, "button_left").setOrigin(0,0).setScale(.60).setInteractive().on("pointerdown", ()=> {
            this.scene.start("storeAisleCerealScene");
        });
        this.rightButton = this.add.sprite(game.config.width - 270, 60, "button_right").setOrigin(0,0).setScale(.65).setInteractive().on("pointerdown", ()=> {
            this.scene.start("storeAisleDairyScene");
        });
        this.tweens.add({
            targets:[this.leftButton, this.leftButton2, this.rightButton],
            x: '-=10',
            ease: 'Sine.easeInOut',
            yoyo:true,
            repeat:-1
        });

        //List creation and cross out
        let list_obj = this.add.sprite(30, 750, "List").setOrigin(0, 0).setDepth(2);
        let list_butt = this.add.sprite(600, 30, "list_button").setOrigin(0, 0).setInteractive().on('pointerdown', () => {
            if (list_obj.y < 740) {
                this.tweens.add({
                    targets: list_obj,
                    y: 750,
                    ease: 'Power1',
                    duration: 1500
                });
            } else {
                this.tweens.add({
                    targets: list_obj,
                    y: game.config.height - list_obj.height - 50,
                    ease: 'Power1',
                    duration: 1500
                });
            }
        });
    }   

    update() {
    }
}