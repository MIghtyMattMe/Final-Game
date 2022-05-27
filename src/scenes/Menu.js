class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image("menu_bg", "./assets/menu/menu_bg.png");
        this.load.audio('menu_music', './assets/Music/Menu_Music.wav');
        this.load.audio('game_music', './assets/Music/Game_Music.wav');
    }

    create() {
        this.bg = this.add.tileSprite(0,0, 980, 720, "menu_bg").setOrigin(0,0);


        //mouse controls
        pointer = this.input.activePointer;
        this.input.mouse.disableContextMenu();

        //load music
        if (menu_music == null) {
            menu_music = this.sound.add('menu_music', {volume: 0.5});
            menu_music.setLoop(true);
            menu_music.play();
        }
        //menu_music.play();

        this.game_music = this.sound.add('game_music', {volume: 0.5});
        this.game_music.setLoop(true);

        //temporary change between scenes & text
        let keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        keySPACE.on('down', (event) => {
            menu_music.stop();
            this.game_music.play();
            curScene = "storeAisleRScene";
            this.scene.start('storeAisleRScene');
        });

        let txt = this.add.text(120, 140, "press Space to start game");

    }

    update() {
        /*if(pointer.isDown){
            menu_music.stop();
            this.game_music.play();
            this.scene.start('storeScene');
        }*/
    }
}