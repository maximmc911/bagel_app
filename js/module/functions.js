// Генератор рандомных чисел в определенном диапазоне, который задается min, max
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // Максимум не включается, минимум включается
  }
  