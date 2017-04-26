import { SET_FIELD } from './actions'

export const initialState = {
    currentPlayer: 'x',
    field: [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    message: "X's turn",
    gameOver: false
};

function analyzeSum(sum) {
    if (sum === 3)
        return 1;
    if (sum === -3)
        return -1;
    return 0;
}

function analyzeWin(field) {
    var i, j, sum, sumAnalyze;


    for (i = 0; i < 3; ++i) {
        sum = 0;
        for (j = 0; j < 3; ++j)
            sum += field[i * 3 + j];
        sumAnalyze = analyzeSum(sum);
        if (sumAnalyze !== 0)
            return sumAnalyze;
    }
    for (i = 0; i < 3; ++i) {
        sum = 0;
        for (j = 0; j < 3; ++j)
            sum += field[j * 3 + i];
        sumAnalyze = analyzeSum(sum);
        if (sumAnalyze !== 0)
            return sumAnalyze;
    }
    sum = 0;
    for (i = 0; i < 3; ++i)
        sum += field[i * 3 + i];
    sumAnalyze = analyzeSum(sum);
    if (sumAnalyze !== 0)
        return sumAnalyze;
    sum = 0;
    for (i = 0; i < 3; ++i)
        sum += field[i * 3 + (2 - i)];
    sumAnalyze = analyzeSum(sum);
    if (sumAnalyze !== 0)
        return sumAnalyze;

    var empty = false;
    for (i = 0; i < 9; ++i)
        if (field[i] === 0) {
            empty = true;
            break;
        }
    if (!empty)
        return 2;

    return 0;
}

export function changeField(state = initialState, action) {
  switch (action.type) {
      case SET_FIELD:
          let { row, col } = action.data;
          let { currentPlayer, message, field, gameOver } = state;
          field = field.slice();

          if (field[3 * row + col] != 0 || gameOver)
              return state;

          if (currentPlayer === "x") {
              currentPlayer = "o";
              message = "O's turn";
              field[3 * row + col] = 1;
          } else {
              currentPlayer = "x";
              message = "X's turn";
              field[3 * row + col] = -1;
          }

          let winAnalyze = analyzeWin(field);
          if (winAnalyze === 1)
              message = "X won";
          else if (winAnalyze === -1)
              message = "O won";
          else if (winAnalyze === 2)
              message = "Draw";

          gameOver = winAnalyze !== 0;

          return {
              currentPlayer : currentPlayer,
              message : message,
              field : field,
              gameOver : gameOver
          };
      default:
          return state;
  }
};