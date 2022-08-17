function getRandomDate(start = new Date(2015, 0, 1), end = new Date()) {
  console.log(start, end);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  )
    .toLocaleString()
    .split(',')[0];
}

function getRandomBool() {
  return Boolean(Math.floor(Math.random() * 2));
}

module.exports = {getRandomDate, getRandomBool};
