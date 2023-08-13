const tableCell = document.querySelector('.container-cell');
const victory = document.querySelector('.table-victory');
const tableButton = document.querySelectorAll('.table-button');
const cell = document.querySelectorAll('.cell');
const tableNone = document.querySelector('.table-victory_none');
let gamerOne = document.querySelector('.one');
let gamerTwo = document.querySelector('.two');
const nameOne = document.querySelector('input');
const gamerStart = document.querySelector('.gamer-start');
const btnOne = document.querySelector('button');

let count = 0;
let plus = 0;
let randomGamer;
let mode = 'playerOne';

const gamer = {
  playerOne: gamerOne,
  playerTwo: gamerOne,
};


//добавление игроков
btnOne.addEventListener('click', () => {
  plus++;
  let nameHTML = nameOne.value;
  nameOne.value = '';
  nameOne.focus();
  tableCell.addEventListener('click', filter);
  if (plus == 1) {
    gamerOne.innerHTML = nameHTML;
  } else {
    gamerTwo.innerHTML = nameHTML;
  }
  let d = gamerOne.textContent;
  let c = gamerTwo.textContent;
  gamer.playerOne = d;
  gamer.playerTwo = c;
  if (plus == 2) {
    btnOne.disabled = true;
    randomGamer = Math.random();
    randomGamer > 0.5 ? (mode = 'playerOne') : (mode = 'playerTwo');
    gamerStart.insertAdjacentHTML('beforeend', gamer[mode]);
    gamerStart.classList.add('table_one');
    tableCell.addEventListener('click', filter);
  }
});
// фильтрация, чей ход
function filter(e) {
  let click = e.target;
  if (click.innerHTML === 'X' || click.innerHTML === '0') {
    count--;
  }
  if ((click.className = 'cell')) {
    if (count % 2 === 0 && click.innerHTML != '0') {
      click.innerHTML = 'X';
      mode = 'playerTwo';
      gamerStart.classList.remove('table_one');
    } else if (count % 2 != 0 && click.innerHTML != 'X') {
      click.innerHTML = '0';
      mode = 'playerOne';
    }
    count++;
 return   game();
  }
}
//сама игра
const game = () => {

  let result = '';
  const arr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < arr.length; i++) {
    if (
      cell[arr[i][0]].innerHTML == 'X' &&
      cell[arr[i][1]].innerHTML == 'X' &&
      cell[arr[i][2]].innerHTML == 'X'
    ) {
      result = 'крестики';
      victoryGame(result);
    } else if (
      cell[arr[i][0]].innerHTML == '0' &&
      cell[arr[i][1]].innerHTML == '0' &&
      cell[arr[i][2]].innerHTML == '0'
    ) {
      result = 'нолики';
      victoryGame(result);
    }
  }
  if (count == 9 && result == '') {
    endGame();
  }
};
// если чья то победа
const victoryGame = (winer) => {
  victory.classList.add('table_one');
  tableCell.removeEventListener('click', filter);
  const blockVictory = document.querySelector('span');
  blockVictory.insertAdjacentHTML('beforebegin', gamer[mode]);
};
// если ничья
const endGame = () => {
  tableNone.classList.add('table_one');
};
//кнопка в модальной окне 
tableButton.forEach((btn) => {
  btn.addEventListener('click', () => {
    victory.classList.remove('table_one');
    tableNone.classList.remove('table_one');
    cell.forEach((click) => {
      click.innerHTML = '';
    });
    count = 0;
    gamerOne.innerHTML = '';
    gamerTwo.innerHTML = '';
    btnOne.disabled = false;
    plus = 0;
  });
});
