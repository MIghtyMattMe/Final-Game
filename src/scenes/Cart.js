class Cart extends Phaser.Scene {
    constructor() {
        super("cartScene");

        this.milk = 0;
        this.eggs = 0;
        this.chips = 0;
        this.cereal = 0;
    }

    preload() {
        this.load.image("side", "./assets/cart/sides.png");
        this.load.image("back_button", "./assets/cart/back_button.png");
        this.load.image("cart_bg", "./assets/cart/cart_bg.png");
        this.load.audio('crack', './assets/Music/egg_crack.mp3');
    }

    create() {
        this.crack = this.sound.add('crack', {volume: 1});
        //create the back button & background
        this.bg = this.add.tileSprite(0,0, 980, 720, "cart_bg").setOrigin(0,0);
        let back_butt = this.add.sprite(500, 30, "back_button").setOrigin(0, 0).setInteractive().on('pointerdown', () => {
            this.scene.start(curScene);
        });

        //create cart 'box'/outline
        let ground = this.physics.add.group({immovable: true, allowGravity: false});
        let grd1 = this.physics.add.sprite(game.config.width/2, game.config.height - borderPadding * 8.75, "side").setScale(0.9, 1).setAlpha(0);
        let grd2 = this.physics.add.sprite(game.config.width/2 - borderPadding * 28 - 5, game.config.height - borderPadding * 9, "side").setAngle(90).setSize(grd1.height, grd1.width).setAlpha(0);
        let grd3 = this.physics.add.sprite(game.config.width/2 + borderPadding * 28, game.config.height - borderPadding * 9, "side").setAngle(90).setSize(grd1.height, grd1.width).setAlpha(0);
        ground.add(grd1);
        ground.add(grd2);
        ground.add(grd3);

        //making one test item to mess with physics (will need to follow these steps for whatever item we add)
        this.groceries = this.physics.add.group({bounceX: 0.5, bounceY: 0.5, gravityY: 400});
        if (new_cart_item != null) {
            let why = new_cart_item.remake(this, 400, 100);
            why.setScale(why.scaleX * 2);
            why.setAlpha(0);
            new_cart_item = null;
            cart.push(why);
        }
        for (let i = 0; i < cart.length; i++) {
            cart[i] = cart[i].remake(this, cart[i].x, cart[i].y);
            this.groceries.add(cart[i]);
        }
        this.input.setDraggable(cart);

        //setting up dragging envitronment
        this.input.dragDistanceThreshold = 0;
        globalThis.gameObject = null;
        globalThis.dragging = false;

        //setting up collisions and checking for weight
        this.physics.add.collider(this.groceries, ground);
        this.physics.add.collider(this.groceries, this.groceries, (obj1, obj2) => {
            if (!globalThis.dragging) {
                if (obj1.y > obj2.y && obj1.weight < obj2.weight && Math.abs(obj1.x-obj2.x) < (obj1.sizeX * obj1.scaleX)) {
                    obj1.exist = false;
                    if (!this.crack.isPlaying) {
                        this.crack.play();
                    }
                } else if (obj1.y < obj2.y && obj1.weight > obj2.weight && Math.abs(obj1.x-obj2.x) < (obj2.sizeX * obj2.scaleX)) {
                    obj2.exist = false;
                    if (!this.crack.isPlaying) {
                        this.crack.play();
                    }
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
        for (let i = 0; i < cart.length; i++) {
            cart[i].update();
            //remove from cart if it shouldn't be there (broken by weight)
            if (cart[i].exist == false) {
                cart[i].destroy();
                cart.splice(i, 1);
            } else {
                //moves the item if it was thrown out of bounds
                if (cart[i].x > (game.config.width + cart[i].width) || cart[i].x < -cart[i].width) {
                    cart[i].x = 400;
                    cart[i].y = -cart[i].height-100;
                    cart[i].setVelocity(0, 0);
                }
                //move's item if it fell out of bounds
                if (cart[i].y > (game.config.height - borderPadding * 10)) { //ground's y
                    cart[i].y = game.config.height - borderPadding * 10 - cart[i].height;
                }
                //brings x velocity to 0
                if (cart[i].body.velocity.x > 1){
                    cart[i].setVelocityX(cart[i].body.velocity.x - 1);
                } else if (cart[i].body.velocity.x < -1){
                    cart[i].setVelocityX(cart[i].body.velocity.x + 1);
                } else {
                    cart[i].setVelocityX(0);
                }
            }
        }
        if(cart[0] != null){
            if(cart[0].title == "Milk" && this.milk == 0){
                this.milk = 1;
                list.push("milk");
            }
            else if(cart[0].title == "Egg" && this.eggs == 0){
                this.eggs = 1;
                list.push("egg");
            }
            else if(cart[0].title == "Chips" && this.chips == 0){
                this.chips = 1;
                list.push("chips");
            }
            else if(cart[0].title == "Cereal" && this.cereal == 0){
                this.cereal = 1;
                list.push("cereal");
            }
        }
    }
}