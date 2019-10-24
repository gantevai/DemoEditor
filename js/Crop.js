import CanvasElement from './CanvasElement.js';

class Crop extends CanvasElement {
  constructor(container, isCrop) {
    super(container, isCrop);

    this.fillColor();
  }

  fillColor() {
    this.context.fillStyle = 'Black';
    this.element.style.opacity = 0.4;
    this.context.fillRect(0, 0, 200, 200);
    this.element.classList.add('crop-section');
  }

  getCropDimensions(mainImageCanvas) {
    var dimension;
    return (dimension = {
      // positionX: this.resizable.offsetLeft,
      // positionY: this.resizable.offsetTop,
      startX: this.resizable.offsetLeft - mainImageCanvas.resizable.offsetLeft,
      startY: this.resizable.offsetTop - mainImageCanvas.resizable.offsetTop,
      width: this.resizable.offsetWidth,
      height: this.resizable.offsetHeight
    });
  }
}

export default Crop;
