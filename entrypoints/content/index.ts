import {storage} from "#imports";

export default defineContentScript({
  matches: ['*://*/*'],
  main() {
    console.log('Hello content.');
    console.log(storage.getItem('local:preference'))
    var div = document.createElement('div');
    var label = document.createElement('span');
    label.textContent = "Hello, world";
    div.appendChild(label);
    document.body.appendChild(div);
  },
});
