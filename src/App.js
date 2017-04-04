import React, { Component } from 'react';
import './App.css';

class Square extends Component {
    constructor(props) {
        super(props);
        this.state = { value : "" };
    }

    squareClick() {
        if (this.state.value === "") {
            this.setState({ value : this.props.currentPlayer });
            this.props.changeTurn(this.props.row, this.props.col);
        }
    }

    render() {
        return (
            <div className="Square" onClick={this.squareClick.bind(this)}>
                {this.state.value}
            </div>
        );
    }
}

class Row extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Row">
                <Square row={this.props.row} col={0} changeTurn={this.props.changeTurn} currentPlayer={this.props.currentPlayer}/>
                <Square row={this.props.row} col={1} changeTurn={this.props.changeTurn} currentPlayer={this.props.currentPlayer}/>
                <Square row={this.props.row} col={2} changeTurn={this.props.changeTurn} currentPlayer={this.props.currentPlayer}/>
            </div>
        );
    }
}

class App extends Component {
  constructor(props) {
      super(props);
      var field = new Array(9);
      for (var i = 0; i < 9; ++i)
          field[i] = 0;
      this.state = {
          currentPlayer : "x",
          message : "X's turn",
          field : field
      };
      this.changeTurn = this.changeTurn.bind(this);
  }

  analyzeSum(sum) {
      if (sum === 3)
          return 1;
      if (sum === -3)
          return -1;
      return 0;
  }

  analyzeWin(field) {
      var i, j, sum, sumAnalyze;


      for (i = 0; i < 3; ++i) {
          sum = 0;
          for (j = 0; j < 3; ++j)
              sum += field[i * 3 + j];
          sumAnalyze = this.analyzeSum(sum);
          if (sumAnalyze !== 0)
              return sumAnalyze;
      }
      for (i = 0; i < 3; ++i) {
          sum = 0;
          for (j = 0; j < 3; ++j)
              sum += field[j * 3 + i];
          sumAnalyze = this.analyzeSum(sum);
          if (sumAnalyze !== 0)
              return sumAnalyze;
      }
      sum = 0;
      for (i = 0; i < 3; ++i)
          sum += field[i * 3 + i];
      sumAnalyze = this.analyzeSum(sum);
      if (sumAnalyze !== 0)
          return sumAnalyze;
      sum = 0;
      for (i = 0; i < 3; ++i)
          sum += field[i * 3 + (2 - i)];
      sumAnalyze = this.analyzeSum(sum);
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
  }

  changeTurn(row, col) {
      let {currentPlayer, message, field} = this.state;
      if (currentPlayer === "x") {
          currentPlayer = "o";
          message = "O's turn";
          field[3 * row + col] = 1;
      } else {
          currentPlayer = "x";
          message = "X's turn";
          field[3 * row + col] = -1;
      }

      var winAnalyze = this.analyzeWin(field);
      if (winAnalyze === 1)
          message = "X won";
      else if (winAnalyze === -1)
          message = "O won";
      else if (winAnalyze === 2)
          message = "Draw";

      this.setState({
          currentPlayer : currentPlayer,
          message : message,
          field : field
      });
  }

  render() {
    return (
        <div>
            <div className="Field">
                <Row row={0} changeTurn={this.changeTurn} currentPlayer={this.state.currentPlayer}/>
                <Row row={1} changeTurn={this.changeTurn} currentPlayer={this.state.currentPlayer}/>
                <Row row={2} changeTurn={this.changeTurn} currentPlayer={this.state.currentPlayer}/>
            </div>
            <div className="Message">
                {this.state.message}
            </div>
        </div>
    );
  }
}

export default App;
