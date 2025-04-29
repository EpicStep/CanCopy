import {storage} from "#imports";

export default defineContentScript({
  matches: ['*://*/*'],
  async main() {
    let settings = await storage.getItem('local:settings')
    if (settings) {

    }

    console.log(settings);
    var div = document.createElement('div');
    var label = document.createElement('span');
    label.textContent = "Hello, world";
    div.appendChild(label);
    document.body.appendChild(div);
  },
});
