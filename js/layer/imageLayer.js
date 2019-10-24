import CanvasElement from '../CanvasElement.js';
import Layer from './layer.js';
import ImageControl from '../controls/imageControl.js';
import Crop from '../Crop.js';

class ImageLayer extends Layer {
  layerCopy = [];
  constructor(container) {
    super(container);
    this.cropSection;
  }

  fillImage(image) {
    this.canvas.handleCanvasSize(image);
  }

  crop() {
    this.cropSection = new Crop('', isCrop);
  }

  filter(imageData) {
    this.canvas.context.clearRect(
      0,
      0,
      this.canvas.getCanvasSize().width,
      this.canvas.getCanvasSize().height
    );

    this.canvas.context.putImageData(imageData, 0, 0);
  }

  getImageData() {
    const imgWidth = this.canvas.getCanvasSize().width;
    const imgHeight = this.canvas.getCanvasSize().height;
    return this.canvas.context.getImageData(0, 0, imgWidth, imgHeight);
  }

  // makeLayerCopy(){

  // }
}
export default ImageLayer;
