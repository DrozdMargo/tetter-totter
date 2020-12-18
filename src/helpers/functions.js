const SHAPES = ['circle', 'triangle', 'rectangle'];

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomBlock() {
  const weight = getRandomInt(1, 10);
  const offset = getRandomInt(1, 5);
  return {
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    weight,
    width: weight * 10,
    offset,
    id: Date.now() + Math.random(),
    color: generateRandomColor()
  }
}

export function getBlockPower(blocks) {
  return blocks.reduce((block, item) => {
    return block += item.weight * item.offset;
  }, 0);
}

function generateRandomNumber(min = 0, max = 1) {
  return min + Math.round(Math.random() * max);
}

export function generateRandomColor() {
  const maxValue = 254;
  const r = generateRandomNumber(0, maxValue);
  const g = generateRandomNumber(0, maxValue);
  const b = generateRandomNumber(0, maxValue);

  return `rgb(${ r }, ${ g }, ${ b })`;
}
