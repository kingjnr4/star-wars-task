import json from "../assets/images.json";
export { default as request } from "./request";
export function getImages(): string[] {
  const base = "../assets/";
  const arr = new Array(13)
    .fill(0)
    .map((_val, index) => base + (index + 1) + ".png");
    return shuffle(arr)
}
function shuffle<T>(array:T[]):T[] {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
