import Editor from './editor.js';
import CanvasElement from './CanvasElement.js';
class Main {
  editor;
  uploadBtn = document.getElementById('uploadBtn');
  fileInputBtn = document.getElementById('fileInputBtn');
  constructor() {
    this.init();
  }

  init() {
    this.editor = new Editor('editing-container');
    this.uploadBtn.onclick = () => {
      this.fileInputBtn.click();
    };
    this.fileInputBtn.onchange = e => {
      this.upload(e);
    };
  }

  upload(input) {
    var that = this;
    if (input.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        var image = new Image();
        image.onload = function(event) {
          that.editor.addImage(image);
        };
        image.src = e.target.result;
      };
      reader.readAsDataURL(input.target.files[0]);
    }
  }
}

new Main();
