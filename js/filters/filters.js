import CONSTANTS from '../Constants.js';
class Filter {
  constructor(imageData) {
    this.image = imageData;
  }

  makeCopy(imageData) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  getImage(filterType) {
    const imageData = this.getFilteredImageData(filterType);
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);

    var image = new Image();
    image.src = canvas.toDataURL();
    return image;
  }

  getFilteredImageData(filterType) {
    const copyImage = this.makeCopy(this.image);
    if (filterType == CONSTANTS.FILTER_TYPE.ORIGINAL) return copyImage;
    return this.applyFilter(copyImage, filterType);
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

      // data[i] = Math.min(255, 0.3 * inputRed + 0.4 * inputGreen + 0.3 * inputBlue);
      // data[i + 1] = Math.min(255, 0.2 * inputRed + 0.6 * inputGreen + 1.2 * inputBlue);
      // data[i + 2] = Math.min(255, 0.01 * inputRed + 0.002 * inputGreen + 1.003 * inputBlue);
    }
    return image;
  }
}

export default Filter;
