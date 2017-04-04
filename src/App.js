import React, { Component } from 'react';
import './App.css';

class Square extends Component {
    constructor(props) {
        super(props);
        this.state = { value : "" };
    }

    squareClick() {
        if (this.state.value == "") {
            this.setState({ value : this.props.currentPlayer });
            this.props.changeTurn();
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
                <Square changeTurn={this.props.changeTurn} currentPlayer={this.props.currentPlayer}/>
                <Square changeTurn={this.props.changeTurn} currentPlayer={this.props.currentPlayer}/>
                <Square changeTurn={this.props.changeTurn} currentPlayer={this.props.currentPlayer}/>
            </div>
        );
    }
}

class App extends Component {
  constructor(props) {
      super(props);
      this.state = { currentPlayer : "x", message : "X's turn" };
      this.changeTurn = this.changeTurn.bind(this);
  }

  changeTurn() {
      let {currentPlayer, message} = this.state;
      if (currentPlayer == "x") {
          currentPlayer = "o";
          message = "O's turn";
      } else {
          currentPlayer = "x";
          message = "X's turn";
      }
      this.setState({ currentPlayer : currentPlayer, message : message });
  }

  render() {
    return (
        <div>
            <div className="Field">
                <Row changeTurn={this.changeTurn} currentPlayer={this.state.currentPlayer}/>
                <Row changeTurn={this.changeTurn} currentPlayer={this.state.currentPlayer}/>
                <Row changeTurn={this.changeTurn} currentPlayer={this.state.currentPlayer}/>
            </div>
            <div className="Message">
                {this.state.message}
            </div>
        </div>
    );
  }
}

export default App;
