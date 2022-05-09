class Store extends Phaser.Scene {
    constructor() {
        super("storeScene");
    }

    preload() {
        this.load.image("store_bg", "./assets/shop/shop_bg.png");
    }

    create() {
        this.bg = this.add.tileSprite(0,0, 980, 720, "store_bg").setOrigin(0,0);
    }

    update() {
        
    }
}