import styles from './style.css';

const readAsText = (file) => new Promise((resolve, reject) => {
  const fr = new FileReader();
  fr.onload = () => resolve(fr.result);
  fr.onerror = () => reject(new Error(`Cannot read as text: ${fr.error}`));
  fr.readAsText(file);
});

class Dropper {
  constructor (el, callback) {
    this.el = el;
    this.callback = callback;
    this.el.addEventListener('dragover', this.ondragover.bind(this));
    this.el.addEventListener('dragleave', this.ondragleave.bind(this));
    this.el.addEventListener('drop', this.ondrop.bind(this));
  }

  ondragover (e) {
    e.preventDefault();
    this.el.classList.add(styles.dropping);
  }

  ondragleave (e) {
    e.preventDefault();
    this.el.classList.remove(styles.dropping);
  }

  ondrop (e) {
    e.preventDefault();
    this.el.classList.remove(styles.dropping);
    if (e.dataTransfer.types.includes('Files') && e.dataTransfer.files.length > 0) {
      Promise.all(Array.from(e.dataTransfer.files).map(readAsText))
        .then((texts) => {
          this.callback(texts);
        });
    }
  }
}

export default Dropper;