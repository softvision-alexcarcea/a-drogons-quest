const random = (max) => Math.floor(Math.random() * max);
const pick = (collection) => {
  return collection[random(collection.length)];
}

export { random, pick };