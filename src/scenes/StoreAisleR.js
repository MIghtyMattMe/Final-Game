//store right aisle

class StoreAisleR extends Phaser.Scene {
    constructor() {
        super("storeAisleRScene");

        this.num = 0;
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
        this.listMilk = this.add.sprite(30, 750, "list_milk").setOrigin(0,0).setDepth(2).setAlpha(alphaNumM);
        this.listEgg = this.add.sprite(30, 750, "list_eggs").setOrigin(0,0).setDepth(2).setAlpha(alphaNumE);
        this.listCereal = this.add.sprite(30, 750, "list_cereal").setOrigin(0,0).setDepth(3).setAlpha(alphaNumCe);
        this.listChips = this.add.sprite(30, 750, "list_chips").setOrigin(0,0).setDepth(4).setAlpha(alphaNumCh);
        let list_butt = this.add.sprite(600, 30, "list_button").setOrigin(0, 0).setInteractive().on('pointerdown', () => {
            if (list_obj.y < 740) {
                this.tweens.add({
                    targets: [list_obj, this.listMilk, this.listEgg, this.listCereal, this.listChips],
                    y: 750,
                    ease: 'Power1',
                    duration: 1500
                });
            } else {
                for(this.num; this.num <= list.length-1; this.num++){
                    if(list[this.num] == "milk"){
                        this.listMilk.setAlpha(alphaNumM);
                        alphaNumM = 1;
                    }
                    else if(list[this.num] == "egg"){
                        this.listEgg.clearAlpha();
                        alphaNumE = 1;
                    }
                    else if(list[this.num] == "chips"){
                        this.listChips.clearAlpha();
                        alphaNumCh = 1;
                    }
                    else if(list[this.num] == "cereal"){
                        this.listCereal.clearAlpha();
                        alphaNumCe = 1;
                    }
                }
                this.tweens.add({
                    targets: [list_obj, this.listMilk, this.listEgg, this.listCereal, this.listChips],
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