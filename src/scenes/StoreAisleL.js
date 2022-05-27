//store left aisle

class StoreAisleL extends Phaser.Scene {
    constructor() {
        super("storeAisleLScene");

    }

    preload() {
        this.load.image("aisleLbg", "./assets/shop/bgs/aisle_left.png");
        
        this.load.image("List", "./assets/shop/List.png");

        this.load.image("collider", "./assets/shop/collider.png");

        //temp buttons for navigation
        this.load.image("cart_button", "./assets/shop/cart_button.png");
        this.load.image("list_button", "./assets/shop/list_button.png");

        //arrows
        this.load.image("button_left", "./assets/shop/bgs/button_left.png");
        this.load.image("button_right", "./assets/shop/bgs/button_right.png");

    }

    create() {
        curScene = "storeAisleLScene";
        //background, shelf, and cart button declaration 
        this.bg = this.add.tileSprite(0,0, 980, 720, "aisleLbg").setOrigin(0,0);

        let cart_butt = this.add.sprite(500, 30, "cart_button").setOrigin(0, 0).setInteractive().on('pointerdown', () => {
            this.scene.start('cartScene');
        });

        //hidden arrow buttons
        this.leftButton = this.add.sprite(-50, 60, "button_left").setOrigin(0,0).setScale(.70).setInteractive().on("pointerdown", ()=> {
            this.scene.start("baggingScene");
        });
        this.rightButton = this.add.sprite(game.config.width - 140, 60, "button_right").setOrigin(0,0).setScale(.70).setInteractive().on("pointerdown", ()=> {
            this.scene.start("storeAisleChipsScene");
        });
        this.rightButton2 = this.add.sprite(game.config.width/2 + 150, 70, "button_right").setOrigin(0,0).setScale(.60).setInteractive().on("pointerdown", ()=> {
            this.scene.start("storeAisleCerealScene");
        });
        this.tweens.add({
            targets:[this.leftButton, this.rightButton, this.rightButton2],
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