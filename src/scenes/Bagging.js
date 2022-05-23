class Bagging extends Phaser.Scene {
    constructor() {
        super("baggingScene");
    }

    preload() {
        this.load.image("side", "./assets/cart/sides.png");
    }

    create() {
        //create bag outline and belt
        let ground = this.physics.add.group({immovable: true, allowGravity: false});
        let grd1 = this.physics.add.sprite(game.config.width/2, game.config.height - borderPadding * 10, "side").setScale(100, 1);
        let grd2 = this.physics.add.sprite(game.config.width/2 + borderPadding * 6, game.config.height - borderPadding * 3, "side").setAngle(90).setSize(grd1.height, grd1.width);
        let grd3 = this.physics.add.sprite(game.config.width/2 + borderPadding * 28, game.config.height - borderPadding * 3, "side").setAngle(90).setSize(grd1.height, grd1.width);
        ground.add(grd1);
        ground.add(grd2);
        ground.add(grd3);

        this.groceries = this.physics.add.group({bounceX: 0.5, bounceY: 0.5, gravityX: 250, gravityY: 400});
        
        for (let i = 0; i < cart.length; i++) {
            cart[i] = cart[i].remake(this, -cart[i].width - (200*i), grd1.y - cart[i].height - 10);
            this.groceries.add(cart[i]);
        }
        this.input.setDraggable(cart);

        //setting up dragging envitronment
        this.input.dragDistanceThreshold = 0;
        globalThis.gameObject = null;
        globalThis.dragging = false;

        //setting up collisions
        this.physics.add.collider(this.groceries, ground);
        this.physics.add.collider(this.groceries, this.groceries);

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
        let gameOver = true;
        for (let i = 0; i < cart.length; i++) {
            cart[i].update();
            //check if off conveyor belt or off screen
            if (cart[i].x > 300){
                cart[i].setGravityX(0);
            } else {
                cart[i].setGravityX(250);
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
            if((cart[i].y < 150) && (cart[i].x < game.config.width/2 + borderPadding * 24) && (cart[i].x > game.config.width/2 + borderPadding * 10) &&
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
            }

            //check if everything was bagged
            //(if something is outside bagging area or if we are dragging no game over)
            if ((cart[i].x > game.config.width/2 + borderPadding * 24) || 
                (cart[i].x < game.config.width/2 + borderPadding * 10) || 
                globalThis.dragging) {
                gameOver = false;
            }
        }

        //if everything was bagged go back to menu and clear cart
        if (gameOver) {
            this.scene.start('endScene');
        }
    }
}