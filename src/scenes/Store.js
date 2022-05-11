class Store extends Phaser.Scene {
    constructor() {
        super("storeScene");
    }

    preload() {
        this.load.image("store_bg", "./assets/shop/shop_bg.png");
        this.load.image("cart", "./assets/shop/test_cart.png");
        this.load.image("shelf", "./assets/shop/test_shelf.png");
        this.load.image("cerealBox", "./assets/shop/text_box.png");
    }

    create() {
        this.bg = this.add.tileSprite(0,0, 980, 720, "store_bg").setOrigin(0,0);
        //this.bg = this.add.image(0,0,"store_bg");
    }

    update() {
        if(pointer.isDown){
            this.scene.start('cartScene');
        }
    }
}