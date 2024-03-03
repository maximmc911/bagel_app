// Получение случайных координат месторасположения зелья или меча
const MakeHeroItems = (e) => {
  const indexArr = [getRandomInt(0, 24), getRandomInt(0, 40)];
  if (
    wall[indexArr[0]][indexArr[1]].wall == false &&
    wall[indexArr[0]][indexArr[1]].items.sword == false &&
    wall[indexArr[0]][indexArr[1]].items.potion == false
  ) {
    switch (e) {
      case `sword`:
        wall[indexArr[0]][indexArr[1]].items.sword = true;
        break;
      case `potion`:
        wall[indexArr[0]][indexArr[1]].items.potion = true;

        break;
      default:
        console.log(`некорректное значение параметра, переданного в ф-цию`);
        break;
    }
  } else {
    MakeHeroItems(e);
  }
};
// Получение необходимого количества зелья и мечей
const PushHeroItems = () => {
  for (let index = 0; index < 2; index++) {
    MakeHeroItems(`sword`);
  }
  for (let index = 0; index < 10; index++) {
    MakeHeroItems(`potion`);
  }
};

// Описание получения героем скиллов при наступления героем на зелье/меч
const UseHeroItems = (array) => {
  if (array.items.sword == true) {
    array.items.sword = false;
    for (const iterator of wall) {
      for (const iter of iterator) {
        iter.hero.danger += 25;
      }
    }
  }
  if (array.items.potion == true) {
    array.items.potion = false;
    if (array.hero.life < 100) {
      for (const iterator of wall) {
        for (const iter of iterator) {
          iter.hero.life += 20;
        }
      }
    }
  }
};
