import { SET_FIELD } from './actions'

export const initialState = {
    currentPlayerX: true,
    field: [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    message: "X's turn",
    gameOver: false
};

function analyzeSum(sum) {
    return parseInt(sum / 3, 0);
}

function calcSum(field, algo) {
    let sum = 0;
    for (var i = 0; i < 3; ++i)
        sum += field[algo(i)];
    return sum;
}

function analyzeWin(field) {
    let sums = [];
    sums.push(calcSum(field, i => 3 * i + i));
    sums.push(calcSum(field, i => 3 * i + 2 - i));
    for (let j = 0; j < 3; ++j) {
        sums.push(calcSum(field, i => 3 * i + j));
        sums.push(calcSum(field, i => 3 * j + i));
    }

    for (let i in sums) {
        let sumAnalyze = analyzeSum(sums[i]);
        if (sumAnalyze !== 0)
            return sumAnalyze;
    }

    for (let i = 0; i < 9; ++i)
        if (field[i] === 0)
            return 0;
    return 2;
}

export function changeField(state = initialState, action) {
  switch (action.type) {
      case SET_FIELD:
          let { row, col } = action.data;
          let { currentPlayerX, message, field, gameOver } = state;
          field = field.slice();

          if (field[3 * row + col] !== 0 || gameOver)
              return state;

          if (currentPlayerX)
              message = "O's turn";
          else
              message = "X's turn";
          field[3 * row + col] = currentPlayerX ? 1 : -1;
          currentPlayerX = !currentPlayerX;

          let winAnalyze = analyzeWin(field);
          if (winAnalyze === 1)
              message = "X won";
          else if (winAnalyze === -1)
              message = "O won";
          else if (winAnalyze === 2)
              message = "Draw";

          gameOver = winAnalyze !== 0;

          return {
              currentPlayerX : currentPlayerX,
              message : message,
              field : field,
              gameOver : gameOver
          };
      default:
          return state;
  }
};