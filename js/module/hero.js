const main_parentDiv1 = document.querySelector(".hero-box");

// Определение начального месторасположения героя

const MakeStartPlaceHero = () => {
  const indexArr = [getRandomInt(0, 24), getRandomInt(0, 40)];
  if (
    wall[indexArr[0]][indexArr[1]].wall == false &&
    wall[indexArr[0]][indexArr[1]].items.sword == false &&
    wall[indexArr[0]][indexArr[1]].items.potion == false &&
    wall[indexArr[0]][indexArr[1]].enemy.place == false
  ) {
    wall[indexArr[0]][indexArr[1]].hero.place = true;
  } else {
    MakeStartPlaceHero();
  }
};

// Отрисовка персонажей

const DrawHero = () => {
  MakeStartPlaceHero();
  for (let index = 0; index < 10; index++) {
    MakeStartPlaceEnemy();
  }
  main_parentDiv1.innerHTML = wall
    .map((info) =>
      info
        .map((e) =>
          e.hero.place
            ? `<div class='tileP' style="left: ${e.left}px; top:${
                e.top
              }px;"><div class="health" style="width: ${
                e.hero.life * 0.24
              }px"></div></div>
    `
            : e.enemy.place
            ? `<div class='tileE' style="left: ${e.left}px; top:${
                e.top
              }px;"><div class="health" style="width: ${
                e.enemy.life * 0.24
              }px"></div></div>`
            : ``
        )
        .join(``)
    )
    .join(``);
};

//  Определение начального месторасположения врагов

const MakeStartPlaceEnemy = () => {
  const indexArr = [getRandomInt(0, 24), getRandomInt(0, 40)];
  if (
    wall[indexArr[0]][indexArr[1]].wall == false &&
    wall[indexArr[0]][indexArr[1]].items.sword == false &&
    wall[indexArr[0]][indexArr[1]].items.potion == false &&
    wall[indexArr[0]][indexArr[1]].hero.place == false
  ) {
    wall[indexArr[0]][indexArr[1]].enemy.place = true;
    wall[indexArr[0]][indexArr[1]].enemy.index = enemyArr.length;

    enemyArr.push({
      x: indexArr[1],
      y: indexArr[0],
      enemy: {
        index: enemyArr.length,
        life: 100,
        place: true,
        danger: 10,
      },
    });
  } else {
    MakeStartPlaceEnemy();
  }
};

// Фиксация нажатий на клавиатуре и создание движения героя

document.addEventListener("keydown", function (event) {
  let index_one = 0;
  let index_two = 0;
  for (let index_x = 0; index_x < wall.length; index_x++) {
    for (let index_y = 0; index_y < wall[index_x].length; index_y++) {
      if (wall[index_x][index_y].hero.place == true) {
        wall[index_x][index_y].hero.place = false;
        index_one = index_x;
        index_two = index_y;
      }
    }
  }
  switch (event.keyCode) {
    case 87: // W
      if (
        index_one == 0 ||
        wall[index_one - 1][index_two].enemy.place == true
      ) {
        wall[index_one][index_two].hero.place = true;
        HandleHitHero(wall[index_one][index_two]);
      } else {
        if (wall[index_one - 1][index_two].wall == false) {
          wall[index_one - 1][index_two].hero.place = true;
          UseHeroItems(wall[index_one - 1][index_two]);

          HandleHitHero(wall[index_one - 1][index_two]);
        } else {
          wall[index_one][index_two].hero.place = true;

          HandleHitHero(wall[index_one][index_two]);
        }
      }

      break;
    case 68: // D
      if (
        index_two == 39 ||
        wall[index_one][index_two + 1].enemy.place == true
      ) {
        wall[index_one][index_two].hero.place = true;

        HandleHitHero(wall[index_one][index_two]);
      } else {
        if (wall[index_one][index_two + 1].wall == false) {
          wall[index_one][index_two + 1].hero.place = true;
          UseHeroItems(wall[index_one][index_two + 1]);

          HandleHitHero(wall[index_one][index_two + 1]);
        } else {
          wall[index_one][index_two].hero.place = true;

          HandleHitHero(wall[index_one][index_two]);
        }
      }
      break;
    case 65: // A
      if (
        index_two == 0 ||
        wall[index_one][index_two - 1].enemy.place == true
      ) {
        wall[index_one][index_two].hero.place = true;

        HandleHitHero(wall[index_one][index_two]);
      } else {
        if (wall[index_one][index_two - 1].wall == false) {
          wall[index_one][index_two - 1].hero.place = true;
          UseHeroItems(wall[index_one][index_two - 1]);

          HandleHitHero(wall[index_one][index_two - 1]);
        } else {
          wall[index_one][index_two].hero.place = true;

          HandleHitHero(wall[index_one][index_two]);
        }
      }
      break;
    case 83: // S
      if (
        index_one == 23 ||
        wall[index_one + 1][index_two].enemy.place == true
      ) {
        wall[index_one][index_two].hero.place = true;

        HandleHitHero(wall[index_one][index_two]);
      } else {
        if (wall[index_one + 1][index_two].wall == false) {
          UseHeroItems(wall[index_one + 1][index_two]);
          wall[index_one + 1][index_two].hero.place = true;

          HandleHitHero(wall[index_one + 1][index_two]);
        } else {
          wall[index_one][index_two].hero.place = true;

          HandleHitHero(wall[index_one][index_two]);
        }
      }
      break;
    case 32: // пробел
      wall[index_one][index_two].hero.place = true;
      HandleHitEnemy(wall[index_one][index_two]);

      break;

    default:
      wall[index_one][index_two].hero.place = true;

      HandleHitHero(wall[index_one][index_two]);

      break;
  }
  HandleRunHero();

  MakeWall(wall);
});

// Отрисовка героя и врагов в случае изменения их месторасположения

const HandleRunHero = () => {
  MakeWall(wall);
  main_parentDiv1.innerHTML = wall
    .map((info) =>
      info
        .map((e) =>
          e.hero.place
            ? `<div class='tileP' style="left: ${e.left}px; top:${
                e.top
              }px;"><div class="health" style="width: ${
                e.hero.life * 0.24
              }px"></div></div>`
            : e.enemy.place
            ? `<div class='tileE' style="left: ${e.left}px; top:${
                e.top
              }px;"><div class="health" style="width: ${
                e.enemy.life * 0.24
              }px"></div></div>`
            : ``
        )
        .join(``)
    )
    .join(``);
};

// Определение следующей точки передвижения врагов

const aiEnemyNext = (enemy) => {
  let arrPlace = [];
  let nextPlace;

  if (enemy.enemy.life <= 0) {
    return;
  }
  for (
    let next_y = Math.max(enemy.y - 1, 0);
    next_y <= Math.min(enemy.y + 1, map_height - 1);
    next_y++
  ) {
    for (
      let next_x = Math.max(enemy.x - 1, 0);
      next_x <= Math.min(enemy.x + 1, map_width - 1);
      next_x++
    ) {
      if (next_y == enemy.y && next_x == enemy.x) {
        continue;
      }

      if (wall[next_y][next_x].wall == false) {
        arrPlace.push({ y: next_y, x: next_x });
      }
    }
  }

  if (arrPlace.length == 0) {
    arrPlace.push({ y: enemy.y, x: enemy.x });
  }

  nextPlace = arrPlace[getRandomInt(0, arrPlace.length - 1)];

  enemy.x = nextPlace.x;
  enemy.y = nextPlace.y;
  wall[nextPlace.y][nextPlace.x].enemy.index = enemy.enemy.index;
  wall[nextPlace.y][nextPlace.x].enemy.life = enemy.enemy.life;
  wall[nextPlace.y][nextPlace.x].enemy.place = enemy.enemy.place;
  wall[nextPlace.y][nextPlace.x].enemy.danger = enemy.enemy.danger;
};

// Очистка предыдущего положения врагов  и передвижение на следующую точку

const aiEnemy = () => {
  for (let ind_y = 0; ind_y < map_height; ind_y++) {
    for (let ind_x = 0; ind_x < map_width; ind_x++) {
      if (
        wall[ind_y][ind_x].enemy.place == true ||
        wall[ind_y][ind_x].enemy.life <= 0
      ) {
        enemyArr[wall[ind_y][ind_x].enemy.index].enemy.life =
          wall[ind_y][ind_x].enemy.life;
        enemyArr[wall[ind_y][ind_x].enemy.index].enemy.place =
          wall[ind_y][ind_x].enemy.place;
        enemyArr[wall[ind_y][ind_x].enemy.index].enemy.danger =
          wall[ind_y][ind_x].enemy.danger;
        wall[ind_y][ind_x].enemy.place = false;
      }
    }
  }
  for (let index = 0; index < enemyArr.length; ++index) {
    aiEnemyNext(enemyArr[index]);
  }
};

// Запуск хаотичного движения врагов со скоростью перемещения  2 с.
const runEnemy = () => {
  aiEnemy();
  HandleRunHero();
};
setInterval(() => {
  runEnemy();
}, 2000);
