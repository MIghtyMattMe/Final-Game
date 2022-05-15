class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image("menu_bg", "./assets/menu/menu_bg.png");
        this.load.audio('bgm', './assets/Music/Shopping_Music.wav');
    }

    create() {
        this.bg = this.add.tileSprite(0,0, 980, 720, "menu_bg").setOrigin(0,0);


        //mouse controls
        pointer = this.input.activePointer;
        this.input.mouse.disableContextMenu();

        //load music
        let menu_music = this.sound.add('bgm', {volume: 0.5});
        menu_music.setLoop(true);
        menu_music.play();
        

    }

    update() {
        if(pointer.isDown){
            this.scene.start('storeScene');
        }
    }
}