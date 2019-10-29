import Control from './control.js';
import CONSTANTS from '../Constants.js';
import Filter from '../filters/filters.js';
class ImageControl extends Control {
  constructor(layer) {
    super(layer);
    this.init();
  }

  init() {
    this.filter = new Filter(this.layer.getImageData());
    this.controlBox.id = 'image_control';
    this.createSpecificControls();
    this.createFilterControls();
    this.createSliderBars();
  }

  createSpecificControls() {
    this.createButton('flip').onclick = () => {
      this.layer.flip();
    };
    this.createButton('crop').onclick = () => {
      this.layer.crop();
    };
  }

  createFilterControls() {
    //for heading of filter section
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
    this.createFilteredThumbnail(CONSTANTS.FILTER_TYPE.BLUR).onclick = () => {
      imageData = this.filter.getFilteredImageData(CONSTANTS.FILTER_TYPE.BLUR);
      this.layer.filter(imageData);
    };
    this.createFilteredThumbnail(CONSTANTS.FILTER_TYPE.SHARPEN).onclick = () => {
      imageData = this.filter.getFilteredImageData(CONSTANTS.FILTER_TYPE.SHARPEN);
      this.layer.filter(imageData);
    };
    this.createFilteredThumbnail(CONSTANTS.FILTER_TYPE.USM).onclick = () => {
      imageData = this.filter.getFilteredImageData(CONSTANTS.FILTER_TYPE.USM);
      this.layer.filter(imageData);
    };
  }

  createSliderBars() {
    // 'for heading of sliderbar section'
    const sliderHeading = document.createElement('div');
    sliderHeading.innerText = 'Manipulators';
    sliderHeading.classList.add('heading-span');
    sliderHeading.classList.add('manipulators');
    this.controlBox.appendChild(sliderHeading);

    let imageData;

    this.brightnessSlider = this.createSlider(
      CONSTANTS.BRIGHTNESS.SLIDER_NAME,
      CONSTANTS.BRIGHTNESS.MIN_VALUE,
      CONSTANTS.BRIGHTNESS.MAX_VALUE,
      CONSTANTS.BRIGHTNESS.INITIAL_VALUE
    );
    this.brightnessSlider.oninput = () => {
      imageData = this.filter.getManipulatedImageData(
        this.brightnessSlider.value,
        CONSTANTS.BRIGHTNESS.SLIDER_NAME
      );
      this.layer.filter(imageData);
    };

    this.contrastSlider = this.createSlider(
      CONSTANTS.CONTRAST.SLIDER_NAME,
      CONSTANTS.CONTRAST.MIN_VALUE,
      CONSTANTS.CONTRAST.MAX_VALUE,
      CONSTANTS.CONTRAST.INITIAL_VALUE
    );
    this.contrastSlider.oninput = () => {
      imageData = this.filter.getManipulatedImageData(
        this.contrastSlider.value,
        CONSTANTS.CONTRAST.SLIDER_NAME
      );
      this.layer.filter(imageData);
    };

    this.saturationSlider = this.createSlider(
      CONSTANTS.SATURATION.SLIDER_NAME,
      CONSTANTS.SATURATION.MIN_VALUE,
      CONSTANTS.SATURATION.MAX_VALUE,
      CONSTANTS.SATURATION.INITIAL_VALUE
    );
    this.saturationSlider.oninput = () => {
      imageData = this.filter.getManipulatedImageData(
        this.saturationSlider.value,
        CONSTANTS.SATURATION.SLIDER_NAME
      );
      this.layer.filter(imageData);
    };
  }

  createSlider(heading, min, max, initialValue) {
    const sliderDiv = document.createElement('div');
    sliderDiv.style.textAlign = 'center';
    sliderDiv.style.cssFloat = 'left';
    const sliderName = document.createElement('h4');
    sliderName.innerText = heading;
    sliderName.classList.add('slider-name');
    sliderDiv.appendChild(sliderName);
    const slider = document.createElement('input');
    slider.setAttribute('type', 'range');
    slider.setAttribute('min', min);
    slider.setAttribute('max', max);
    slider.setAttribute('value', initialValue);
    slider.classList.add('sliders');
    sliderDiv.appendChild(slider);
    this.controlBox.appendChild(sliderDiv);
    return slider;
  }

  createFilteredThumbnail(filterType) {
    const image = this.filter.getImage(filterType, true);
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
