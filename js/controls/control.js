class Control {
  container;
  controlBox;
  buttonArray = []; // all the buttons within the control box
  constructor(layer) {
    this.layer = layer;
    this.createElement();
    this.createCommonControls();
  }

  createElement() {
    this.controlBox = document.createElement('div');
    document.getElementsByTagName('body')[0].appendChild(this.controlBox);
  }

  createCommonControls() {
    this.createButton('rotate-left').onclick = () => {
      this.layer.rotateLeft();
    };
    this.createButton('rotate-right').onclick = () => {
      this.layer.rotateRight();
    };
    this.createButton('flip').onclick = () => {
      this.layer.flip();
    };
  }

  createButton(name) {
    const button = document.createElement('button');
    const icon = new Image();
    icon.src = `images/${name}.png`;
    button.append(icon);
    this.controlBox.appendChild(button);
    return button;
  }

  // makeDraggable() {}

  // remove() {
  //   this.control = null;
  // }
}
export default Control;
