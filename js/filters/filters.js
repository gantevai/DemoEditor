import CONSTANTS from '../Constants.js';
class Filter {
  changes;
  constructor(imageData) {
    this.imageData = imageData;
    this.changes = {};
  }

  makeCopy(imageData) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  getImage(filterType, original) {
    const imageData = this.getFilteredImageData(filterType, original);
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);

    var image = new Image();
    image.src = canvas.toDataURL();
    return image;
  }

  getFilteredImageData(filterType, original) {
    let editedImage;
    if (original) {
      editedImage = this.makeCopy(this.imageData);
    } else {
      editedImage = this.getChangedImage('filter');
      this.recordChanges('filter', filterType);
    }
    if (filterType == CONSTANTS.FILTER_TYPE.ORIGINAL) return editedImage;
    return this.applyFilter(editedImage, filterType);
  }

  applyFilter(image, filterType) {
    let data = image.data;
    let weights;

    switch (filterType) {
      case CONSTANTS.FILTER_TYPE.SEPIA:
        for (var i = 0; i < data.length; i += 4) {
          var inputRed = data[i];
          var inputGreen = data[i + 1];
          var inputBlue = data[i + 2];
          data[i] = Math.min(255, 0.393 * inputRed + 0.769 * inputGreen + 0.189 * inputBlue);
          data[i + 1] = Math.min(255, 0.349 * inputRed + 0.686 * inputGreen + 0.168 * inputBlue);
          data[i + 2] = Math.min(255, 0.272 * inputRed + 0.534 * inputGreen + 0.131 * inputBlue);
        }

        break;
      case CONSTANTS.FILTER_TYPE.GRAYSCALE:
        for (var i = 0; i < data.length; i += 4) {
          var inputRed = data[i];
          var inputGreen = data[i + 1];
          var inputBlue = data[i + 2];
          data[i] = Math.min(255, 0.299 * inputRed + 0.587 * inputGreen + 0.114 * inputBlue);
          data[i + 1] = Math.min(255, 0.299 * inputRed + 0.587 * inputGreen + 0.114 * inputBlue);
          data[i + 2] = Math.min(255, 0.299 * inputRed + 0.587 * inputGreen + 0.114 * inputBlue);
        }
        break;
      case CONSTANTS.FILTER_TYPE.BLUR:
        weights = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9];
        image = this.convolute(image, image.width, image.height, weights, true);
        break;
      case CONSTANTS.FILTER_TYPE.SHARPEN:
        weights = [0, -1, 0, -1, 5, -1, 0, -1, 0];
        image = this.convolute(image, image.width, image.height, weights, true);
        break;
      case CONSTANTS.FILTER_TYPE.USM:
        weights = [
          -1 / 256,
          -2 / 256,
          -6 / 256,
          -4 / 256,
          -1 / 256,
          -4 / 256,
          -16 / 256,
          -24 / 256,
          -16 / 256,
          -4 / 256,
          -6 / 256,
          -24 / 256,
          476 / 256,
          -24 / 256,
          -6 / 256,
          -4 / 256,
          -16 / 256,
          -24 / 256,
          -16 / 256,
          -4 / 256,
          -1 / 256,
          -4 / 256,
          -6 / 256,
          -4 / 256,
          -1 / 256
        ];
        image = this.convolute(image, image.width, image.height, weights, true);
        break;
      default:
        break;
    }
    return image;
  }

  getManipulatedImageData(sliderValue, sliderName) {
    const editedImage = this.getChangedImage(sliderValue);
    this.recordChanges(sliderName, sliderValue);
    return this.manipulate(editedImage, sliderValue, sliderName);
  }

  manipulate(image, sliderValue, sliderName) {
    var data = image.data;
    for (var i = 0; i < data.length; i += 4) {
      var inputRed = data[i];
      var inputGreen = data[i + 1];
      var inputBlue = data[i + 2];
      var factor;
      switch (sliderName) {
        case CONSTANTS.BRIGHTNESS.SLIDER_NAME:
          factor = CONSTANTS.BRIGHTNESS.FACTOR;
          data[i] = Math.min(255, sliderValue * factor + inputRed);
          data[i + 1] = Math.min(255, sliderValue * factor + inputGreen);
          data[i + 2] = Math.min(255, sliderValue * factor + inputBlue);
          break;
        case CONSTANTS.CONTRAST.SLIDER_NAME:
          let contrast = sliderValue * CONSTANTS.CONTRAST.FACTOR * 2.55;
          factor = (contrast + 255) / (255.01 - contrast);
          let midValue = 128;

          data[i] = factor * (data[i] - midValue) + midValue;
          data[i + 1] = factor * (data[i + 1] - midValue) + midValue;
          data[i + 2] = factor * (data[i + 2] - midValue) + midValue;
          break;
        case CONSTANTS.SATURATION.SLIDER_NAME:
          data[i] = data[i + 1] = data[i + 2] = (inputBlue + inputGreen + inputRed) / 3;
          break;
        default:
          break;
      }
    }
    return image;
  }

  recordChanges(name, value) {
    this.changes[name] = value;
  }

  getChangedImage(ignoreEffect) {
    let copy = this.makeCopy(this.imageData);
    if (this.changes === {}) {
      return copy;
    }
    for (var key in this.changes) {
      if (Object.prototype.hasOwnProperty.call(this.changes, key)) {
        if (key === 'filter' && ignoreEffect !== 'filter') {
          copy =
            this.changes[key] == CONSTANTS.FILTER_TYPE.ORIGINAL
              ? copy
              : this.applyFilter(copy, this.changes[key]);
        } else if (key !== ignoreEffect) {
          copy = this.manipulate(copy, this.changes[key], key);
        }
      }
    }
    return copy;
  }

  convolute(imageData, width, height, weights, opaque) {
    let weightsLength = Math.round(Math.sqrt(weights.length));
    let halfSide = Math.floor(weightsLength / 2);
    let sw = width;
    let sh = height;
    //pad output by the convolution matrix
    let w = width;
    let h = height;
    //go through the destination image pixels
    let alphaFactor = opaque ? 1 : 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let sy = y;
        let sx = x;
        let dstOff = (y * w + x) * 4;
        //calculate weighted sum of the source image pixels
        //that fall under the convolution matrix
        let r = 0,
          g = 0,
          b = 0,
          a = 0;
        for (let cy = 0; cy < weightsLength; cy++) {
          for (let cx = 0; cx < weightsLength; cx++) {
            let scy = sy + cy - halfSide;
            let scx = sx + cx - halfSide;
            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
              let srcOff = (scy * sw + scx) * 4;
              let wt = weights[cy * weightsLength + cx];
              r += imageData[srcOff] * wt;
              g += imageData[srcOff + 1] * wt;
              b += imageData[srcOff + 2] * wt;
              a += imageData[srcOff + 3] * wt;
            }
          }
        }
        imageData[dstOff] = r;
        imageData[dstOff + 1] = g;
        imageData[dstOff + 2] = b;
        imageData[dstOff + 3] = a + alphaFactor * (255 - a);
      }
    }
    return imageData;
  }
}

export default Filter;
