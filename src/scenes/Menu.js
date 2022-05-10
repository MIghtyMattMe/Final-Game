class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image("menu_bg", "./assets/menu/menu_bg.png");
    }

    create() {
        this.bg = this.add.tileSprite(0,0, 980, 720, "menu_bg").setOrigin(0,0);


        //mouse controls
        pointer = this.input.activePointer;
        this.input.mouse.disableContextMenu();
        

    }

    update() {
        if(pointer.isDown){
            this.scene.start('storeScene');
        }
    }
}