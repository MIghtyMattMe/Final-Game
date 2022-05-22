class Item extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, title, weight, cost, frame) {
      super(scene, x, y, texture, frame);
      scene.physics.add.existing(this);
      scene.add.existing(this);

      //references
      this.scene = scene;
      this.dropped = false;

      this.setGravityY(2000);
      this.setInteractive({ draggable: true });
      scene.input.setDraggable(this);
      this.texture = texture;
      this.title = title;
      this.weight = weight;
      this.cost = cost;

      //scene.input.on("dragstart", function(pointer){ this.disableG(); });
      //scene.input.on("dragend", this.enableG(pointer));

    }

    update() {
      if (this.dropped) {
        this.scene.clock = this.scene.time.delayedCall(500, () => {
          this.dropped = false;
      }, null, this);
      }

      //anim and physics maybe

    }

    //call when adding things to cart inorder to give a new reference to item
    remake(scene, x, y) {
      let remade = new Item(scene, x, y, this.texture, this.title, this.weight, this.cost).setDepth(1);
      return remade;
    }
}