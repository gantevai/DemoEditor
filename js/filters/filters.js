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
    var data = image.data;
    for (var i = 0; i < data.length; i += 4) {
      var inputRed = data[i];
      var inputGreen = data[i + 1];
      var inputBlue = data[i + 2];
      switch (filterType) {
        case CONSTANTS.FILTER_TYPE.SEPIA:
          data[i] = Math.min(255, 0.393 * inputRed + 0.769 * inputGreen + 0.189 * inputBlue);
          data[i + 1] = Math.min(255, 0.349 * inputRed + 0.686 * inputGreen + 0.168 * inputBlue);
          data[i + 2] = Math.min(255, 0.272 * inputRed + 0.534 * inputGreen + 0.131 * inputBlue);
          break;
        case CONSTANTS.FILTER_TYPE.GRAYSCALE:
          data[i] = data[i + 1] = data[i + 2] = (inputBlue + inputGreen + inputRed) / 3;
          break;
        default:
          break;
      }
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
        // case CONSTANTS.SATURATION.SLIDER_NAME:
        //   data[i] = data[i + 1] = data[i + 2] = (inputBlue + inputGreen + inputRed) / 3;
        //   break;
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
}

export default Filter;
