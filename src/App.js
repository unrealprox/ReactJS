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
      this.state = { currentPlayer : "x" };
      this.changeTurn = this.changeTurn.bind(this);
  }

  changeTurn() {
      let {currentPlayer} = this.state;
      if (currentPlayer == "x")
          currentPlayer = "o";
      else
          currentPlayer = "x";
      this.setState({ currentPlayer : currentPlayer});
  }

  render() {
    return (
        <div className="Field">
            <Row changeTurn={this.changeTurn} currentPlayer={this.state.currentPlayer}/>
            <Row changeTurn={this.changeTurn} currentPlayer={this.state.currentPlayer}/>
            <Row changeTurn={this.changeTurn} currentPlayer={this.state.currentPlayer}/>
        </div>
    );
  }
}

export default App;
