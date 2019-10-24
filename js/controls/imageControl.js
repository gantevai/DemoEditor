import Control from './control.js';
import CONSTANTS from '../Constants.js';
import Filter from '../filters/filters.js';
class ImageControl extends Control {
  controlWidth = 144;

  constructor(layer) {
    super(layer);
    this.init();
  }

  init() {
    this.filter = new Filter(this.layer.getImageData());
    this.controlBox.id = 'image_control';
    // this.controlBox.style.height = `${this.defaultSize.height}px`;
    this.controlBox.style.width = `${this.controlWidth}px`;
    this.createSpecificControls();
    this.createFilterControls();
  }

  createSpecificControls() {
    this.createButton('crop').onclick = () => {
      this.layer.crop();
    };
  }

  createFilterControls() {
    const filterHeading = document.createElement('div');
    filterHeading.innerText = 'Filters';
    filterHeading.classList.add('heading-span');
    this.controlBox.appendChild(filterHeading);
    let imageData;
    this.createFilteredThumbnail(CONSTANTS.FILTER_TYPE.ORIGINAL).onclick = () => {
      imageData = this.filter.getFilteredImageData(CONSTANTS.FILTER_TYPE.ORIGINAL);
      this.layer.filter(imageData);
    };
    this.createFilteredThumbnail(CONSTANTS.FILTER_TYPE.GRAYSCALE).onclick = () => {
      imageData = this.filter.getFilteredImageData(CONSTANTS.FILTER_TYPE.GRAYSCALE);
      this.layer.filter(imageData);
    };
    this.createFilteredThumbnail(CONSTANTS.FILTER_TYPE.SEPIA).onclick = () => {
      imageData = this.filter.getFilteredImageData(CONSTANTS.FILTER_TYPE.SEPIA);
      this.layer.filter(imageData);
    };
    this.createFilteredThumbnail(CONSTANTS.FILTER_TYPE.SEPIA).onclick = () => {
      imageData = this.filter.getFilteredImageData(CONSTANTS.FILTER_TYPE.SEPIA);
      this.layer.filter(imageData);
    };
    this.createFilteredThumbnail(CONSTANTS.FILTER_TYPE.GRAYSCALE).onclick = () => {
      imageData = this.filter.getFilteredImageData(CONSTANTS.FILTER_TYPE.GRAYSCALE);
      this.layer.filter(imageData);
    };
    this.createFilteredThumbnail(CONSTANTS.FILTER_TYPE.SEPIA).onclick = () => {
      imageData = this.filter.getFilteredImageData(CONSTANTS.FILTER_TYPE.SEPIA);
      this.layer.filter(imageData);
    };
  }

  createFilteredThumbnail(filterType) {
    const image = this.filter.getImage(filterType);
    const anchor = document.createElement('a');
    const span = document.createElement('span');
    span.style.fontWeight = 'bold';
    span.style.fontSize = '11px';
    span.innerText = filterType;
    anchor.appendChild(image);
    anchor.appendChild(span);
    this.controlBox.appendChild(anchor);
    return anchor;
  }
}
export default ImageControl;
