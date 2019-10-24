import CanvasElement from './CanvasElement.js';
import ImageLayer from './layer/imageLayer.js';
import ImageControl from './controls/imageControl.js';
class Editor {
  layers;
  constructor(container) {
    this.container = container;
    this.init();
  }

  init() {
    this.layers = [];
    this.canvas = new CanvasElement(this.container);
  }

  addImage(image) {
    const IMAGE_LAYER = new ImageLayer(this.container);
    IMAGE_LAYER.fillImage(image);
    IMAGE_LAYER.changeZindex(this.layers.length);
    this.layers.push(IMAGE_LAYER);
    IMAGE_LAYER.bindClick(this.layerClicked.bind(this), this.layers.indexOf(IMAGE_LAYER));
  }

  /**
   * @summary : this function gets called when a layer canvas is clicked.
   * @param {*} index: index of the layer clicked; used to change z index; hide resizable of other layers;
   * to identify the layer clicked is either text or image
   * @param {*} ayerContext : the context of the clicked layer (i.e. image layer or text layer)
   * @memberof Editor
   */
  layerClicked(index, layerContext) {
    this.layers[index].changeZindex(this.layers.length);
    this.layers.forEach((layer, i) => {
      if (i != index) {
        layer.hideResizeable();
        layer.changeZindex(i);
      }
    });
    if (layerContext instanceof ImageLayer) {
      this.control = new ImageControl(layerContext);
    } else {
      this.control = new this.showTextControl(layerContext)
    }
  }

  displayLayers(){
    
  }



  // showImageControl(context) {
  //   let IMAGE_CONTROL = new ImageControl();
  //   IMAGE_CONTROL.bindRotateLeft(context.rotateLeft.bind(context));
  //   IMAGE_CONTROL.bindRotateRight(context.rotateRight.bind(context));
  //   IMAGE_CONTROL.bindFlip(context.flip.bind(context));
  //   // IMAGE_CONTROL.bindCrop(context.crop.bind(context));
  // }

  // showTextControl(context) {

  // }

  // addText() {
  //     const text = new TextLayer();
  //     this.layers.push(text);
  //     text.onClick = new TextControl();
  // }
}

export default Editor;
