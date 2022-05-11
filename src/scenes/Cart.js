class Cart extends Phaser.Scene {
    constructor() {
        super("cartScene");
    }

    preload() {
        this.load.image("side", "./assets/sides.png");
        this.load.image("test_obj", "./assets/test_obj.png");
    }

    create() {
        //create cart 'box'/outline
        let ground = this.physics.add.sprite(game.config.width/2, game.config.height - borderPadding * 10, "side").setScale(0.75, 1);
        ground.body.allowGravity = false;
        ground.setImmovable();

        let test_item = this.physics.add.sprite(game.config.width/2, 50, "test_obj").setInteractive();
        test_item.body.bounce.set(0.5);
        this.input.setDraggable(test_item);
        this.input.dragDistanceThreshold = 0;

        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.body.allowGravity = false;
            gameObject.body.bounce.set(0);
        });
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.setVelocityX((dragX - gameObject.x) * 2);
            gameObject.setVelocityY((dragY - gameObject.y) * 2);
        });
        this.input.on('dragend', function (pointer, gameObject) {
            gameObject.body.allowGravity = true;
            gameObject.setVelocity(0, 0);
            gameObject.body.bounce.set(0.5);
        });

        this.physics.add.collider(test_item, ground);
    }

    update() {
    }
}