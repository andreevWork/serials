export function radomizeArray(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    do {
      randomIndex = Math.floor(Math.random() * currentIndex);
    } while(currentIndex !== 1 && randomIndex === currentIndex - 1);

    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
