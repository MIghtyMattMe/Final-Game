class Item extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.physics.add.existing(this);
      scene.add.existing(this);

      //references
      this.scene = scene;

      this.setGravityY(2000);
      this.setInteractive();
      scene.input.setDraggable(this);

      //scene.input.on("dragstart", function(pointer){ this.disableG(); });
      //scene.input.on("dragend", this.enableG(pointer));

    }

    update() {
      if(pointer.isDown ){
        this.disableG();
      }
      else{
        this.enableG();
      }

      //anim and physics maybe

    }



    //if picked up fcn
    disableG(){
      this.setGravityY(0);
    }
    enableG(){
      this.setGravityY(2000);
    }

    //call when adding things to cart inorder to give a new reference to item
    remake(scene) {
      let remade = new Item(scene, 400, 100, "cerealBox").setDepth(1);
      return remade;
    }


}