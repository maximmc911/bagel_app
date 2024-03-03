// Объявление константных данных
const map_width = 40;
const map_height = 24;
const wall = [];
const roadArr = [];
const roomArr = [];
const enemyArr = [];
// Заполнение двумерного массива карты wall
for (let index_y = 0; index_y < map_height; index_y++) {
  let top = 30;
  wall.push([]);
  top *= index_y;
  for (let index_x = 0; index_x < map_width; index_x++) {
    let left = 30;
    left *= index_x;
    wall[index_y].push({
      wall: true,
      top: top,
      left: left,
      items: {
        sword: false,
        potion: false,
      },
      hero: {
        life: 100,
        place: false,
        danger: 50,
      },
      enemy: {
        index: 0,
        life: 100,
        place: false,
        danger: 10,
      },
    });
  }
}
