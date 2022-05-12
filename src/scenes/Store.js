//store

class Store extends Phaser.Scene {
    constructor() {
        super("storeScene");
    }

    preload() {
        this.load.image("store_bg", "./assets/shop/shop_bg.png");
        this.load.image("cart", "./assets/shop/test_cart.png");
        this.load.image("shelf", "./assets/shop/test_shelf.png");
        this.load.image("cerealBox", "./assets/shop/test_box.png");

        this.load.image("collider", "./assets/shop/collider.png");
    }

    create() {
        //test assets
        this.bg = this.add.tileSprite(0,0, 980, 720, "store_bg").setOrigin(0,0);
        //this.shelf = this.add.sprite(0, 15, "shelf").setOrigin(0,0);

        //hidden colliders
        let collider = this.physics.add.sprite(0, 150, "collider").setOrigin(0,0);
        collider.body.allowGravity = false;
        collider.setImmovable();
        let ground = this.physics.add.sprite(0, game.config.height - 50, "collider").setOrigin(0,0);
        ground.body.allowGravity = false;
        ground.setImmovable();

        //player
        player = new Player(this, game.config.width/2 + 200, game.config.height-180, "cart").setDepth(1);
        player.setGravityY(2000);
        this.physics.add.collider(player, ground);

        //item
        this.box = new Item();
    }   

    update() {
        if(pointer.isDown){
            //this.scene.start('cartScene');
        }
    }
}