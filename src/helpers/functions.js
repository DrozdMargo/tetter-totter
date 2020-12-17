const SHAPES = ['circle', 'triangle', 'rectangle'];

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomBlock() {
  const weight = getRandomInt(1, 10);
  return {
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    weight,
    width: weight * 10,
    offset: getRandomInt(1, 45),
  }
}
