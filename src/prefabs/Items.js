class Item extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      //scene.physics.add.existing(this);
      scene.add.existing(this);

      this.mass;
    }

    update() {
      
    }
}