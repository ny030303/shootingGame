export const loadImage = (name) => {
  return new Promise((res, rej) => {
    let img = new Image();
    img.src = `./images/${name}`;
    img.addEventListener("load", () => {
      res(img);
    });
  });
};

export const loadJSON = async (url) => {
  await fetch(url);
}