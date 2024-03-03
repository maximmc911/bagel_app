const main_parentDiv2 = document.querySelector(".field");

// Создание комнат
const MakeRooms = (place, width, height) => {
  let is_isolated = true;
  let min_x, max_x, min_y, max_y;

  // Проверка комнаты на изолированность
  for (let index = 0; index < roadArr.length; index++) {
    if (
      (roadArr[index].axis == "vert" &&
        place.width - 1 <= roadArr[index].x &&
        roadArr[index].x <= place.width + width &&
        ((roadArr[index].y <= place.top - 1 &&
          place.top - 1 <= roadArr[index].y + roadArr[index].length) ||
          (roadArr[index].y <= place.top + height &&
            place.top + height <= roadArr[index].y + roadArr[index].length))) ||
      (roadArr[index].axis == "horiz" &&
        place.top - 1 <= roadArr[index].y &&
        roadArr[index].y <= place.top + height &&
        ((roadArr[index].x <= place.width - 1 &&
          place.width - 1 <= roadArr[index].x + roadArr[index].length) ||
          (roadArr[index].x <= place.width + width &&
            place.width + width <= roadArr[index].x + roadArr[index].length)))
    ) {
      is_isolated = false;
      break;
    }
  }

  if (is_isolated == true) {
    // Передвижение координат комнаты к случайной дороге
    let neight_road = roadArr[getRandomInt(0, roadArr.length - 1)];

    if (neight_road.axis == "vert") {
      min_x = Math.max(neight_road.x - width, 0);
      max_x = Math.min(neight_road.x + 1, map_width - 1);
      min_y = Math.max(neight_road.y + 1, 0);
      max_y = Math.min(neight_road.y + neight_road.length - 1, map_height - 1);
    } else if (neight_road.axis == "horiz") {
      min_x = Math.max(neight_road.x + 1, 0);
      max_x = Math.min(neight_road.x + neight_road.length - 1, map_width - 1);
      min_y = Math.max(neight_road.y - height - 1, 0);
      max_y = Math.min(neight_road.y - 1, map_height - 1);
    }

    place.width = getRandomInt(min_x, max_x);
    place.top = getRandomInt(min_y, max_y);
  }

  roomArr.push({
    x: place.width,
    y: place.top,
    width: width,
    height: height,
  });

  min_x = Math.max(place.width, 0);
  max_x = Math.min(place.width + width, map_width - 1);
  min_y = Math.max(place.top, 0);
  max_y = Math.min(place.top + height, map_height - 1);

  for (let index = min_y; index < max_y; index++) {
    for (let index2 = min_x; index2 < max_x; index2++) {
      wall[index][index2].wall = false;
    }
  }
};
// Создание коридоров
const MakeRoads = (line, axis, length) => {
  // Проверка дороги на соседство с другими
  for (let index = 0; index < roadArr.length; index++) {
    if (
      roadArr[index].axis == "vert" &&
      roadArr[index].x - 1 <= line &&
      line <= roadArr[index].x + 1
    ) {
      line = getRandomInt(1, map_width - 1);
      index = 0;
    } else if (
      roadArr[index].axis == "horiz" &&
      roadArr[index].y - 1 <= line &&
      line <= roadArr[index].y + 1
    ) {
      line = getRandomInt(1, map_height - 1);
      index = 0;
    }
  }

  switch (axis) {
    case "horiz":
      roadArr.push({
        x: 0,
        y: line,
        axis: axis,
        length: length,
      });

      for (let index = 0; index < length; index++) {
        wall[line][index].wall = false;
      }
      break;
    case "vert":
      roadArr.push({
        x: line,
        y: 0,
        axis: axis,
        length: length,
      });

      for (let index = 0; index < length; index++) {
        wall[index][line].wall = false;
      }
      break;
    default:
      console.log(`некорректное значение параметра, переданного в ф-цию`);
      break;
  }
};

// Отрисовка карты и элементы (меч и зелья) героя
const MakeWall = (arr) => {
  main_parentDiv2.innerHTML = arr
    .map((info) =>
      info
        .map((e) =>
          e.wall
            ? `
          <div class='tileW' style="left: ${e.left}px; top:${e.top}px;  "></div>
          `
            : e.items.sword == false && e.items.potion == false
            ? `
          <div class='tile' style="left: ${e.left}px; top:${e.top}px;  "></div>
          `
            : e.items.sword == false
            ? `  <div class='tileHP' style="left: ${e.left}px; top:${e.top}px;  "></div>`
            : `  <div class='tileSW' style="left: ${e.left}px; top:${e.top}px;  "></div>`
        )
        .join(``)
    )
    .join(``);
};

// Запуск отрисовки карты и генерация комнат и коридоров

const MakeMap = () => {
  for (let index = 0; index < getRandomInt(3, 6); index++) {
    MakeRoads(getRandomInt(1, 23), "horiz", map_width);
  }
  for (let index = 0; index < getRandomInt(3, 6); index++) {
    MakeRoads(getRandomInt(1, 39), "vert", map_height);
  }

  for (let index = 0; index < getRandomInt(5, 11); index++) {
    MakeRooms(
      { top: getRandomInt(0, 19), width: getRandomInt(0, 34) },
      getRandomInt(3, 6),
      getRandomInt(3, 6)
    );
  }

  PushHeroItems();
  MakeWall(wall);
};
