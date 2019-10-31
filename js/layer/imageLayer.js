import CanvasElement from '../CanvasElement.js';
import Layer from './layer.js';
import ImageControl from '../controls/imageControl.js';
import Crop from '../Crop.js';

class ImageLayer extends Layer {
  // layerCopy = [];
  constructor(container) {
    super(container);
    this.cropSection;
  }

  fillImage(image) {
    this.canvas.handleCanvasSize(image);
    this.original = image;
  }

  resetChanges() {
    this.canvas.createImageCopy(this.original);
    // this.canvas.getContext().drawImage(this.original, 0, 0,this.original.width,this.original.height);
    this.canvas.handleCanvasSize(this.original);
    // var canvas = document.createElement('canvas');
    // var ctx = canvas.getContext('2d');
    // canvas.width = this.original.width;
    // canvas.height = this.original.height;
    // ctx.drawImage(this.original, 0, 0);
    // return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  crop() {
    if (this.cropSection) {
      this.cropSection.destroy();
    }
    this.cropSection = new Crop(this.canvas.resizable, true);
    this.cropSection.resizable.ondblclick = () => {
      this.cropImage();
    };
  }

  cropImage() {
    const CROP_DIMENSION = this.cropSection.getCropDimensions(this.canvas);
    this.cropSection.destroy();
    this.cropSection = null;

    const IMAGE = new Image();
    IMAGE.onload = () => {
      this.canvas.setCanvasSize(CROP_DIMENSION.width, CROP_DIMENSION.height);
      this.canvas
        .getContext()
        .drawImage(
          IMAGE,
          CROP_DIMENSION.startX,
          CROP_DIMENSION.startY,
          CROP_DIMENSION.width,
          CROP_DIMENSION.height,
          0,
          0,
          CROP_DIMENSION.width,
          CROP_DIMENSION.height
        );
      this.canvas.createImageCopy();
    };
    IMAGE.src = this.canvas.getCanvas().toDataURL();
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
}
export default ImageLayer;
