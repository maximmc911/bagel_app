// Фиксация ударов, производимые героем
const HandleHitEnemy = (array) => {
  const allBots = [];
  if (wall[array.top / 30 + 1][array.left / 30].enemy.place == true) {
    wall[array.top / 30 + 1][array.left / 30].enemy.life -=
      wall[array.top / 30][array.left / 30].hero.danger;
  }
  if (wall[array.top / 30 - 1][array.left / 30].enemy.place == true) {
    wall[array.top / 30 - 1][array.left / 30].enemy.life -=
      wall[array.top / 30][array.left / 30].hero.danger;
  }
  if (wall[array.top / 30][array.left / 30 + 1].enemy.place == true) {
    wall[array.top / 30][array.left / 30 + 1].enemy.life -=
      wall[array.top / 30][array.left / 30].hero.danger;
  }
  if (wall[array.top / 30][array.left / 30 - 1].enemy.place == true) {
    wall[array.top / 30][array.left / 30 - 1].enemy.life -=
      wall[array.top / 30][array.left / 30].hero.danger;
  }

  if (wall[array.top / 30 + 1][array.left / 30].enemy.life <= 0) {
    wall[array.top / 30 + 1][array.left / 30].enemy.place = false;
  }
  if (wall[array.top / 30 - 1][array.left / 30].enemy.life <= 0) {
    wall[array.top / 30 - 1][array.left / 30].enemy.place = false;
  }
  if (wall[array.top / 30][array.left / 30 + 1].enemy.life <= 0) {
    wall[array.top / 30][array.left / 30 + 1].enemy.place = false;
  }
  if (wall[array.top / 30][array.left / 30 - 1].enemy.life <= 0) {
    wall[array.top / 30][array.left / 30 - 1].enemy.place = false;
  }

  for (const iterator of wall) {
    for (const iter of iterator) {
      if (iter.enemy.place) {
        allBots.push(iter);
      }
    }
  }
  if (allBots.length == 0) {
    setTimeout(() => {
      if (confirm(`Вы выиграли, сыграем еще раз?`)) {
        location.reload();
      } else {
        window.close();
      }
    }, 1000);
  }
};
// Фиксация ударов, производимые врагами
const HandleHitHero = (array) => {
  if (
    wall[array.top / 30 + 1][array.left / 30].enemy.place == true ||
    wall[array.top / 30 - 1][array.left / 30].enemy.place == true ||
    wall[array.top / 30][array.left / 30 + 1].enemy.place == true ||
    wall[array.top / 30][array.left / 30 - 1].enemy.place == true
  ) {
    for (const iterator of wall) {
      for (const iter of iterator) {
        iter.hero.life -= 10;
      }
    }
  }
  if (
    wall[array.top / 30 + 1][array.left / 30].hero.life <= 0 ||
    wall[array.top / 30 - 1][array.left / 30].hero.life <= 0 ||
    wall[array.top / 30][array.left / 30 + 1].hero.life <= 0 ||
    wall[array.top / 30][array.left / 30 - 1].hero.life <= 0
  ) {
    for (const iterator of wall) {
      for (const iter of iterator) {
        iter.hero.place = false;
      }
    }
    setTimeout(() => {
      if (confirm(`Вы проиграли, сыграем еще раз?`)) {
        location.reload();
      } else {
        window.close();
      }
    }, 1000);
  }
};
