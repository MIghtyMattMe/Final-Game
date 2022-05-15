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
        this.load.image("cart_button", "./assets/shop/cart_button.png");
        this.load.image("list_button", "./assets/shop/list_button.png");

        this.load.image("collider", "./assets/shop/collider.png");

    }

    create() {
        //NOTES:
        /*  set colliders to local
            substitute this.box with items group declaration
        */


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
        //player.setGravityY(2000);

        //item
        this.box = new Item(this, game.config.width/8, game.config.height/8, "cerealBox").setDepth(1);
        
        //add colliders and overlap
        this.physics.add.collider(player, ground);
        this.physics.add.collider(this.box, ground);
        this.physics.add.collider(this.box, collider);
        this.physics.add.overlap(this.box, player, this.incrementI, null, this);


        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
            //this.shopDrag = true;
        });

    }   

    update() {

        player.update();
        this.box.update();

        //if held over cart - enter cart scene
        //this.physics.arcade.overlap(this.box, player, incrementI, null, this);
        
        if(this.i >= 15){
            this.i=0;
            new_cart_item = this.box;
            this.scene.start('cartScene');
        }
        
    }

    incrementI(){
        this.i++;
    }
}