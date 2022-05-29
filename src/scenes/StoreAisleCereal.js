//store

class StoreAisleCereal extends Phaser.Scene {
    constructor() {
        super("storeAisleCerealScene");

        this.i = 0;
        this.shopDrag = false;
    }

    preload() {
        this.load.image("storeCerealbg", "./assets/shop/bgs/aisle_cereal.png");
        this.load.image("cart", "./assets/shop/test_cart.png");
        this.load.image("cerealBox", "./assets/shop/items/cereal.png");
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
        curScene = "storeAisleCerealScene";
        //cart button declaration 
        let cart_butt = this.add.sprite(500, 30, "cart_button").setDepth(1).setOrigin(0, 0).setInteractive().on('pointerdown', () => {
            this.scene.start('cartScene');
        });

        //hidden colliders
        let collider = this.physics.add.sprite(0, 250, "collider").setOrigin(0,0);
        collider.body.allowGravity = false;
        collider.setImmovable();
        let ground = this.physics.add.sprite(0, game.config.height - 50, "collider").setOrigin(0,0);
        ground.body.allowGravity = false;
        ground.setImmovable();

        //background
        this.bg = this.add.tileSprite(0,0, 980, 720, "storeCerealbg").setOrigin(0,0);

        //hidden arrow buttons
        this.leftButton = this.add.sprite(-50, 60, "button_left").setOrigin(0,0).setScale(.70).setInteractive().on("pointerdown", ()=> {
            this.scene.start("storeAisleLScene");
        });                  
        this.rightButton = this.add.sprite(game.config.width - 140, 60, "button_right").setOrigin(0,0).setScale(.70).setInteractive().on("pointerdown", ()=> {
            this.scene.start("storeAisleRScene");
        });
        this.tweens.add({
            targets:[this.leftButton, this.rightButton],
            x: '-=10',
            ease: 'Sine.easeInOut',
            yoyo:true,
            repeat:-1
        });


        //player
        player = new Player(this, game.config.width/2 + 200, game.config.height-(180*.80), "cart").setDepth(1).setScale(.7);

        //item creation (repeat for each item)
        let items = []
        this.box = new Item(this, game.config.width/2 + 100, collider.y - collider.height - 30, "cerealBox", "Cereal", 2.0, 3.57).setDepth(1).setScale(0.25);
        this.box.body.setSize(this.box.width - 150, this.box.height - 100, true);
        this.box.sizeX = this.box.width - 150;
        this.box.sizeY = this.box.height - 100;
        this.input.setDraggable(this.box);
        items.push(this.box);

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
        //this.physics.add.collider(items, items);
        this.physics.add.overlap(items, player, this.incrementI, null, this);


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
        this.box.update();

        //if held over cart - enter cart scene
        //this.physics.arcade.overlap(this.box, player, incrementI, null, this);
        
        if(this.i >= 15){
            this.i=0;
            new_cart_item = globalThis.gameObject;
            this.scene.start('cartScene');
        }       
    }

    incrementI(){
        this.i++;
    }
}