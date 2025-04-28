import {storage} from "#imports";

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  storage.getItem('local:preference').then((res: Number) => {
    console.log("from bg", res)
  })
});
