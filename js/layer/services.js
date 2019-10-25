export class Services {
  resizers = [];
  createResizers() {
    this.resizers = document.createElement('div');
    this.resizers.classList.add('resizers');
    this.resizable.appendChild(this.resizers);
    this.resizerTopLeft = document.createElement('div');
    this.resizerTopLeft.classList.add('resizer');
    this.resizerTopLeft.classList.add('top-left-resizer');
    this.resizerTopRight = document.createElement('div');
    this.resizerTopRight.classList.add('resizer');
    this.resizerTopRight.classList.add('top-right-resizer');
    this.resizerBottomLeft = document.createElement('div');
    this.resizerBottomLeft.classList.add('resizer');
    this.resizerBottomLeft.classList.add('bottom-left-resizer');
    this.resizerBottomRight = document.createElement('div');
    this.resizerBottomRight.classList.add('resizer');
    this.resizerBottomRight.classList.add('bottom-right-resizer');
    this.resizers.appendChild(this.resizerTopLeft);
    this.resizers.appendChild(this.resizerTopRight);
    this.resizers.appendChild(this.resizerBottomLeft);
    this.resizers.appendChild(this.resizerBottomRight);

    this.resizerArray.push(this.resizerTopLeft);
    this.resizerArray.push(this.resizerTopRight);
    this.resizerArray.push(this.resizerBottomLeft);
    this.resizerArray.push(this.resizerBottomRight);
  }
  makeResizable(element) {
    var resizeBind, stopResizeBind;
    const imageState = {
      original_width: 0,
      original_height: 0,
      original_x: 0,
      original_y: 0,
      original_mouse_x: 0,
      original_mouse_y: 0
    };
    // this.createImageCopy();
    for (var i = 0; i < this.resizerArray.length; i++) {
      const currentResizer = this.resizerArray[i];
      currentResizer.addEventListener('mousedown', e => {
        if (!this.sourceImageCopied) {
          this.sourceImageCopied = true;
          this.createImageCopy();
        }
        e.preventDefault();
        imageState.original_width = parseFloat(
          getComputedStyle(this.element, null)
            .getPropertyValue('width')
            .replace('px', '')
        );
        imageState.original_height = parseFloat(
          getComputedStyle(this.element, null)
            .getPropertyValue('height')
            .replace('px', '')
        );
        imageState.original_x = this.element.getBoundingClientRect().left;
        imageState.original_y = this.element.getBoundingClientRect().top;
        imageState.original_mouse_x = e.pageX;
        imageState.original_mouse_y = e.pageY;

        resizeBind = resize.bind(this);
        stopResizeBind = stopResize.bind(this);

        window.addEventListener('mousemove', resizeBind);
        window.addEventListener('mouseup', stopResizeBind);
      });

      function resize(e) {
        if (currentResizer.classList.contains('bottom-right-resizer')) {
          const width = imageState.original_width + (e.pageX - imageState.original_mouse_x);
          const height = imageState.original_height + (e.pageY - imageState.original_mouse_y);

          if (
            width > CONSTANTS.RESIZE_CONSTRAINTS.MIN_SIZE &&
            e.pageX < this.container.offsetLeft + this.container.offsetWidth
          ) {
            this.resizable.style.width = this.element.style.width = width + 'px';
          }

          if (
            height > CONSTANTS.RESIZE_CONSTRAINTS.MIN_SIZE &&
            e.pageY < this.container.offsetTop + this.container.offsetHeight
          ) {
            this.resizable.style.height = this.element.style.height = height + 'px';
          }
        } else if (currentResizer.classList.contains('bottom-left-resizer')) {
          const width = imageState.original_width - (e.pageX - imageState.original_mouse_x);
          const height = imageState.original_height + (e.pageY - imageState.original_mouse_y);

          if (
            width > CONSTANTS.RESIZE_CONSTRAINTS.MIN_SIZE &&
            e.pageX > this.container.offsetLeft
          ) {
            this.resizable.style.width = this.element.style.width = width + 'px';
            this.resizable.style.left =
              imageState.original_x + (e.pageX - imageState.original_mouse_x) + 'px';
            this.element.style.left = 0 + 'px';
          }

          if (
            height > CONSTANTS.RESIZE_CONSTRAINTS.MIN_SIZE &&
            e.pageY < this.container.offsetTop + this.container.offsetHeight
          ) {
            this.resizable.style.height = this.element.style.height = height + 'px';
          }
        } else if (currentResizer.classList.contains('top-right-resizer')) {
          const width = imageState.original_width + (e.pageX - imageState.original_mouse_x);
          const height = imageState.original_height - (e.pageY - imageState.original_mouse_y);
          if (
            width > CONSTANTS.RESIZE_CONSTRAINTS.MIN_SIZE &&
            e.pageX < this.container.offsetLeft + this.container.offsetWidth
          ) {
            this.resizable.style.width = this.element.style.width = width + 'px';
          }
          if (
            height > CONSTANTS.RESIZE_CONSTRAINTS.MIN_SIZE &&
            e.pageY > this.container.offsetTop
          ) {
            this.resizable.style.height = this.element.style.height = height + 'px';
            this.resizable.style.top =
              imageState.original_y + (e.pageY - imageState.original_mouse_y) + 'px';
            this.element.style.top = 0;
          }
        } else {
          const width = imageState.original_width - (e.pageX - imageState.original_mouse_x);
          const height = imageState.original_height - (e.pageY - imageState.original_mouse_y);
          if (
            width > CONSTANTS.RESIZE_CONSTRAINTS.MIN_SIZE &&
            e.pageX > this.container.offsetLeft
          ) {
            this.resizable.style.width = this.element.style.width = width + 'px';
            this.resizable.style.left =
              imageState.original_x + (e.pageX - imageState.original_mouse_x) + 'px';
            this.element.style.left = 0;
          }
          if (
            height > CONSTANTS.RESIZE_CONSTRAINTS.MIN_SIZE &&
            e.pageY > this.container.offsetTop
          ) {
            this.resizable.style.height = this.element.style.height = height + 'px';
            this.resizable.style.top =
              imageState.original_y + (e.pageY - imageState.original_mouse_y) + 'px';
            this.element.style.top = 0;
          }
        }
      }

      function stopResize(e) {
        window.removeEventListener('mousemove', resizeBind);
        this.resizeImage();
        window.removeEventListener('mouseup', stopResizeBind);
      }
    }
  }

  removeResizable(element) {}
}
