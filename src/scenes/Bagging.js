class Bagging extends Phaser.Scene {
    constructor() {
        super("baggingScene");
    }

    preload() {
        this.load.image("side", "./assets/cart/sides.png");
        this.load.image("checkout_bg", "./assets/checkout/checkout2.png");
        this.load.image("checkout_bag", "./assets/checkout/bag.png");
        this.load.audio('crunch', './assets/Music/bag_crunch.mp3');
    }

    create() {
        //create bag sound effect
        this.crunch = this.sound.add('crunch', {volume: 1});
        //create background
        this.bg = this.add.tileSprite(0,0, 980, 720, "checkout_bg").setOrigin(0,0);
        this.bag = this.add.sprite(game.config.width/2 + borderPadding * 5, 115, "checkout_bag").setOrigin(0,0).setScale(4.5,3.75);
        //create bag outline and belt
        let ground = this.physics.add.group({immovable: true, allowGravity: false});
        let grd1 = this.physics.add.sprite(game.config.width/2, game.config.height - borderPadding * 14.5, "side").setScale(100, 1).setAlpha(0);
        let grd2 = this.physics.add.sprite(game.config.width/2 + borderPadding * 6, game.config.height - borderPadding * 5, "side").setAngle(90).setSize(grd1.height, grd1.width).setAlpha(0);
        let grd3 = this.physics.add.sprite(game.config.width/2 + borderPadding * 28, game.config.height - borderPadding * 5, "side").setAngle(90).setSize(grd1.height, grd1.width).setAlpha(0);
        ground.add(grd1);
        ground.add(grd2);
        ground.add(grd3);

        this.groceries = this.physics.add.group({bounceX: 0.5, bounceY: 0.5, gravityX: 0, gravityY: 400});
        
        for (let i = 0; i < cart.length; i++) {
            cart[i] = cart[i].remake(this, -(200*(i)) - 100, grd1.y - 200 - 10);
            this.groceries.add(cart[i]);
        }
        this.input.setDraggable(cart);

        //setting up dragging envitronment
        this.input.dragDistanceThreshold = 0;
        globalThis.gameObject = null;
        globalThis.dragging = false;

        //setting up collisions
        this.physics.add.collider(this.groceries, ground);
        this.physics.add.collider(this.groceries, this.groceries, (obj1, obj2) => {
            if (!globalThis.dragging) {
                if (obj1.y > obj2.y && obj1.weight < obj2.weight && Math.abs(obj1.x-obj2.x) < (obj1.sizeX * obj1.scaleX)) {
                    obj1.exist = false;
                } else if (obj1.y < obj2.y && obj1.weight > obj2.weight && Math.abs(obj1.x-obj2.x) < (obj2.sizeX * obj2.scaleX)) {
                    obj2.exist = false;
                }
            }
        });

        //drag items
        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.body.allowGravity = false;
            globalThis.gameObject = gameObject;
            globalThis.dragging = true;
            gameObject.body.bounce.set(0);
        });
        this.input.on('dragend', function (pointer, gameObject) {
            gameObject.body.allowGravity = true;
            gameObject.dropped = true;
            gameObject.body.bounce.set(0.5);
            globalThis.gameObject = null;
            globalThis.dragging = false;
        });

    }

    update() {
        //setting velocity for items in the cart
        if (globalThis.dragging) {
            globalThis.gameObject.setVelocityX((pointer.x - globalThis.gameObject.x) * 8);
            globalThis.gameObject.setVelocityY((pointer.y - globalThis.gameObject.y) * 8);
        }
        globalThis.gameOver = true;
        for (let i = 0; i < cart.length; i++) {
            cart[i].update();
            //check if the item was deleted first
            if (cart[i].exist == false) {
                cart[i].destroy();
                cart.splice(i, 1);
            } else {
                //check if off conveyor belt or off screen
                if (cart[i].x > 300){
                    cart[i].setGravityX(0);
                    cart[i].body.bounce.set(0.5);
                } else {
                    cart[i].setGravityX(150);
                    cart[i].body.bounce.set(0);
                }
                if (cart[i].x > (game.config.width + cart[i].width)) {
                    cart[i].x = 400;
                    cart[i].y = -cart[i].height-100;
                    cart[i].setVelocity(0, 0);
                }
                
                //keeps from falling through ground
                if ((cart[i].y > (game.config.height - borderPadding * 10)) && (cart[i].y < 800)) { //ground's y
                    cart[i].y = game.config.height - borderPadding * 10 - cart[i].height;
                }

                //resets X velocity
                if (cart[i].body.velocity.x > 1) {
                    cart[i].setVelocityX(cart[i].body.velocity.x - 1);
                } else if (cart[i].body.velocity.x < -1) {
                    cart[i].setVelocityX(cart[i].body.velocity.x + 1);
                } else {
                    cart[i].setVelocityX(0);
                }

                //check if bag full, aka
                //if y is greater than walls of bag and x is between walls
                //if the velocity of both x and y is almost 0
                //if we are not dragging it
                //if it wasn't just dropped
                if((cart[i].y < 220) && (cart[i].y > 0) && (cart[i].x < game.config.width/2 + borderPadding * 30) && (cart[i].x > game.config.width/2 + borderPadding * 6) &&
                (cart[i].body.velocity.x < 10) && (cart[i].body.velocity.y < 10) && 
                (cart[i].body.velocity.x > -10) && (cart[i].body.velocity.y > -10) && 
                (!globalThis.dragging) &&
                (!cart[i].dropped)) { 
                    //play bag moving sound
                    //"delete" the items in the bag
                    for (let j = 0; j < cart.length; j++) {
                        if (cart[j].x > game.config.width/2 + borderPadding * 6) { //if past the left wall of the bag
                            cart[j].setAlpha(0);
                            cart[j].y += 1000;
                        }
                    }
                    this.bag_tween();
                }

                //check if everything was bagged
                //(if something is outside bagging area or if we are dragging no game over)
                if ((cart[i].x > game.config.width/2 + borderPadding * 32) || 
                    (cart[i].x < game.config.width/2 + borderPadding * 5) || 
                    globalThis.dragging) {
                        globalThis.gameOver = false;
                }
            }
        }

        if (globalThis.gameOver) {
            for (let j = 0; j < cart.length; j++) {
                if (cart[j].x > game.config.width/2 + borderPadding * 6) { //if past the left wall of the bag
                    cart[j].setAlpha(0);
                    cart[j].y += 1000;
                }
            }
            this.bag_tween();
        }
    }

    //the tween for when the bag moves off screen
    bag_tween() {
        if (!this.crunch.isPlaying) {
            this.crunch.play();
        }
        this.tweens.add({
            targets: this.bag,
            y: -400,
            ease: 'Power1',
            duration: 1000
        });
        this.clock = this.time.delayedCall(1000, () => {
            if (globalThis.gameOver) {
                this.scene.start('endScene');
            }
            this.tweens.add({
                targets: this.bag,
                y: 115,
                ease: 'Power1',
                duration: 1000
            });
        }, null, this);
    }
}