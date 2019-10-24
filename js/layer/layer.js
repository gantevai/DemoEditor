import CanvasElement from '../CanvasElement.js';
class Layer {
  constructor(container) {
    this.canvas = new CanvasElement(container);
    this.rotationAngle = 0;
    this.isTransforming = false;
    this.degreeToRadian = Math.PI / 180;
  }

  changeZindex(zIndex) {
    this.canvas.changeZIndex(zIndex);
  }

  bindClick(clicked, index) {
    this.canvas.element.onclick = () => {
      this.canvas.showresizable();
      clicked(index, this);
    };
  }

  hideResizeable() {
    this.canvas.hideresizable();
  }

  rotateLeft() {
    if (!this.isTransforming) {
      this.rotationAngle = -90;
      this.transformImage(true);
    }
  }

  rotateRight() {
    if (!this.isTransforming) {
      this.rotationAngle = 90;
      this.transformImage(true);
    }
  }

  flip() {
    if (!this.isTransforming) {
      this.transformImage();
    }
  }
  /**
   *
   * @param {*} rotate - pass true for rotate and false(or nothing) for flip action
   */
  transformImage(rotate) {
    this.isTransforming = true;
    this.canvas.createImageCopy();
    const IMAGE = this.canvas.getOldImage();
    IMAGE.src = this.canvas.getOldImage().src;

    IMAGE.onload = function(e) {
      e.preventDefault();
      if (rotate) {
        var tempWidth = IMAGE.width;
        var tempHeight = IMAGE.height;
        this.canvas.setCanvasSize(tempHeight, tempWidth);
        this.canvas.context.translate(
          this.canvas.getCanvasSize().width / 2,
          this.canvas.getCanvasSize().height / 2
        );

        this.canvas.context.rotate(this.rotationAngle * this.degreeToRadian);
        this.canvas.context.drawImage(IMAGE, -IMAGE.width / 2, -IMAGE.height / 2);
        this.canvas.context.translate(-IMAGE.width / 2, -IMAGE.height / 2);
      } else {
        this.canvas.getContext().translate(this.canvas.getCanvasSize().width, 0);
        this.canvas.getContext().scale(-1, 1);
        this.canvas.getContext().drawImage(IMAGE, 0, 0);
      }

      this.canvas.sourceImageCopied = false;
      this.canvas.createImageCopy();
      this.isTransforming = false;
    }.bind(this);
  }
}

export default Layer;