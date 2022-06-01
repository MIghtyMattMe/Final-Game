//store

class StoreAisleChips extends Phaser.Scene {
    constructor() {
        super("storeAisleChipsScene");

        this.i = 0;
        this.shopDrag = false;
    }

    preload() {
        this.load.image("store_bg", "./assets/shop/bgs/aisle_chips.png");
        this.load.image("cart", "./assets/shop/test_cart.png");
        this.load.image("chips", "./assets/shop/items/chips.png");
        this.load.image("List", "./assets/shop/List.png");

        this.load.image("collider", "./assets/shop/collider.png");
        this.load.image("box", "./assets/shop/test_box.png");

        //temp buttons for navigation
        this.load.image("cart_button", "./assets/shop/cart_button.png");
        this.load.image("list_button", "./assets/shop/list_button.png");

        //arrows
        this.load.image("button_left", "./assets/shop/bgs/button_left.png");
        this.load.image("button_right", "./assets/shop/bgs/button_right.png");

        //player atlas
        this.load.atlas("player", "./assets/shop/playerAtlas.png", "./assets/shop/player.json");

    }

    create() {
        curScene = "storeAisleChipsScene";
        // cart button declaration 
        let cart_butt = this.add.sprite(500, 30, "cart_button").setDepth(1).setOrigin(0, 0).setInteractive().on('pointerdown', () => {
            this.scene.start('cartScene');
        });

        //hidden collider 
        let collider = this.physics.add.sprite(0, 250, "collider").setOrigin(0,0);
        collider.body.allowGravity = false;
        collider.setImmovable();
        let ground = this.physics.add.sprite(0, game.config.height - 50, "collider").setOrigin(0,0);
        ground.body.allowGravity = false;
        ground.setImmovable();
        this.cart = this.physics.add.sprite(game.config.width/2 + 100, game.config.height-150, "box").setSize(200, 150);

        //background
        this.bg = this.add.tileSprite(0,0, 980, 720, "store_bg").setOrigin(0,0);

        //hidden arrow buttons
        this.leftButton = this.add.sprite(-50, 60, "button_left").setOrigin(0,0).setScale(.70).setInteractive().on("pointerdown", ()=> {
            player.anims.play("walking", true);
            player.setVelocityX(-100);
        });                     
        this.rightButton = this.add.sprite(game.config.width - 140, 60, "button_right").setOrigin(0,0).setScale(.70).setInteractive().on("pointerdown", ()=> {
            player.anims.play("walking", true);
            player.setVelocityX(100);
        });
        this.tweens.add({
            targets:[this.leftButton, this.rightButton],
            x: '-=10',
            ease: 'Sine.easeInOut',
            yoyo:true,
            repeat:-1
        });


        //player
        this.anims.create({key: "walking", frames: this.anims.generateFrameNames("player", {prefix: "walking", end: 1, zeroPad:3}), frameRate:4, repeat:-1});
        player = new Player(this, game.config.width/2, game.config.height-(180*1.3), "player").setDepth(1).setScale(.45);
        player.body.allowGravity = false;

        //item creation (repeat for each item)
        let items = []
        this.chips = new Item(this, game.config.width/2 - 100, collider.y - collider.height - 25, "chips", "Chips", 2.0, 1.20).setDepth(1).setScale(0.25);
        this.chips.body.setSize(this.chips.width - 160, this.chips.height - 110, true);
        this.chips.sizeX = this.chips.width - 160;
        this.chips.sizeY = this.chips.height - 110;
        this.input.setDraggable(this.chips);
        items.push(this.chips);

        //declaring for drag
        this.input.dragDistanceThreshold = 0;
        globalThis.gameObject = null;
        globalThis.dragging = false;
        
        //add colliders and overlap
        this.physics.add.collider(player, ground);
        for (let j = 0; j < items.length; j++) {
            items[j].store_collider = this.physics.add.collider(items[j], collider);
        }
        this.physics.add.collider(items, ground);
        this.physics.add.overlap(items, this.cart, this.incrementI, null, this);


        //drag start and end properties
        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.body.allowGravity = false;
            globalThis.gameObject = gameObject;
            globalThis.gameObject.store_collider.active = false;
            globalThis.dragging = true;
            gameObject.body.bounce.set(0);
        });
        this.input.on('dragend', function (pointer, gameObject) {
            globalThis.gameObject.store_collider.active = true;
            gameObject.body.allowGravity = true;
            gameObject.body.setVelocityX(0);
            gameObject.dropped = true;
            gameObject.body.bounce.set(0.5);
            //globalThis.gameObject = null;
            globalThis.dragging = false;
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
        if (globalThis.dragging) {
            globalThis.gameObject.setVelocityX((pointer.x - globalThis.gameObject.x) * 8);
            globalThis.gameObject.setVelocityY((pointer.y - globalThis.gameObject.y) * 8);
        }

        player.update();
        this.chips.update();

        //if held over cart - enter cart scene
        //this.physics.arcade.overlap(this.box, player, incrementI, null, this);
        
        if(this.i >= 15){
            this.i=0;
            new_cart_item = globalThis.gameObject;
            this.scene.start('cartScene');
        }

        //change scenes when player hits sides
        if(player.x <=200){
            curScene = "storeAisleLScene";
            this.scene.start("storeAisleLScene");
            //console.log("boundary");
        }
        else if(player.x >= game.config.width - 200){
            curScene = "storeAisleRScene";
            this.scene.start("storeAisleRScene");
        }

        
    }

    incrementI(){
        this.i++;
    }
}