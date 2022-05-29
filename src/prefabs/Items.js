class Item extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, title, weight, cost, frame) {
      super(scene, x, y, texture, frame);
      scene.physics.add.existing(this);
      scene.add.existing(this);

      //references
      this.scene = scene;
      this.dropped = false;

      this.setGravityY(400);
      this.setInteractive({ draggable: true });
      scene.input.setDraggable(this);
      this.texture = texture;
      this.title = title;
      this.weight = weight;
      this.cost = cost;

      //used to remake size
      this.sizeX
      this.sizeY
      
      //exist will turn false if the item is 'broken' by to much weight
      this.exist = true;

      this.store_collider; //this is used for the store scene to toggle collision with the shelf
    }

    update() {
      if (this.dropped) {
        this.scene.clock = this.scene.time.delayedCall(500, () => {
            this.dropped = false;
        }, null, this);
      }
    }

    //call when adding things to cart inorder to give a new reference to item
    remake(scene, x, y) {
      let remade = new Item(scene, x, y, this.texture, this.title, this.weight, this.cost).setDepth(1).setScale(this.scale);
      remade.sizeX = this.sizeX;
      remade.sizeY = this.sizeY;
      remade.setSize(remade.sizeX, remade.sizeY);
      return remade;
    }
}