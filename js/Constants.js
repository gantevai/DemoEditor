const CONSTANTS = {
  RESIZE_CONSTRAINTS: { MIN_SIZE: 20 },
  FILTER_TYPE: {
    ORIGINAL: 'original',
    SEPIA: 'sepia',
    GRAYSCALE: 'grayscale',
    SHARPEN: 'sharpen',
    BLUR: 'blur',
    USM: 'usm'
  },
  BRIGHTNESS: {
    SLIDER_NAME: 'Brightness',
    MIN_VALUE: -10,
    MAX_VALUE: 10,
    INITIAL_VALUE: 0,
    FACTOR: 2
  },
  CONTRAST: {
    SLIDER_NAME: 'Contrast',
    MIN_VALUE: -10,
    MAX_VALUE: 10,
    INITIAL_VALUE: 0,
    FACTOR: 6
  },
  SATURATION: {
    SLIDER_NAME: 'Saturation',
    MIN_VALUE: -10,
    MAX_VALUE: 10,
    INITIAL_VALUE: 0,
    FACTOR: 2
  }
};
export default CONSTANTS;
