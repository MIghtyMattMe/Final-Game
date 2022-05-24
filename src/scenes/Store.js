//store

class Store extends Phaser.Scene {
    constructor() {
        super("storeScene");

        this.i = 0;
        this.shopDrag = false;
    }

    preload() {
        this.load.image("store_bg", "./assets/shop/shop_bg.png");
        this.load.image("cart", "./assets/shop/test_cart.png");
        this.load.image("shelf", "./assets/shop/test_shelf.png");
        this.load.image("cerealBox", "./assets/shop/test_box.png");
        this.load.image("cerealBox_x2", "./assets/shop/test_box_heavy.png");
        this.load.image("cart_button", "./assets/shop/cart_button.png");
        this.load.image("list_button", "./assets/shop/list_button.png");

        this.load.image("collider", "./assets/shop/collider.png");

        //temp to get to cart
        this.load.image("bag_button", "./assets/shop/bag_button.png");

    }

    create() {
        //NOTES:
        /*  set colliders to local
            substitute this.box with items group declaration
        */
        //create way to bagging sceen (temp)
        let bag_butt = this.add.sprite(700, 30, "bag_button").setDepth(1).setOrigin(0, 0).setInteractive().on('pointerdown', () => {
            this.scene.start('baggingScene');
        });


        //test assets
        this.bg = this.add.tileSprite(0,0, 980, 720, "store_bg").setOrigin(0,0);
        this.shelf = this.add.sprite(0, 15, "shelf").setOrigin(0,0);
        let cart_butt = this.add.sprite(500, 30, "cart_button").setOrigin(0, 0).setInteractive().on('pointerdown', () => {
            this.scene.start('cartScene');
        });

        //hidden colliders
        let collider = this.physics.add.sprite(0, 150, "collider").setOrigin(0,0);
        collider.body.allowGravity = false;
        collider.setImmovable();
        let ground = this.physics.add.sprite(0, game.config.height - 50, "collider").setOrigin(0,0);
        ground.body.allowGravity = false;
        ground.setImmovable();

        //player
        player = new Player(this, game.config.width/2 + 200, game.config.height-180, "cart").setDepth(1);

        //item creation (repeat for each item)
        let items = []
        this.box = new Item(this, game.config.width/8, game.config.height/8, "cerealBox", "Cereal", 1.0, 4.53).setDepth(1);
        this.input.setDraggable(this.box);
        items.push(this.box);
        this.box2 = new Item(this, game.config.width/8 + 150, game.config.height/8, "cerealBox_x2", "Cereal_x2", 1.0, 9.06).setDepth(1);
        this.input.setDraggable(this.box2);
        items.push(this.box2);

        //delcaring for drag
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

    }   

    update() {
        if (globalThis.dragging) {
            globalThis.gameObject.setVelocityX((pointer.x - globalThis.gameObject.x) * 8);
            globalThis.gameObject.setVelocityY((pointer.y - globalThis.gameObject.y) * 8);
        }

        player.update();
        this.box.update();
        this.box2.update();

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