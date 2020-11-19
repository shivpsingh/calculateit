import React from 'react';
import './App.css';

class App extends React.Component {

  DEFAULT_TIME = 15;

  add = (x, y) => {
    return x + y;
  }

  subtract = (x, y) => {
    return x - y;
  }

  multiply = (x, y) => {
    return x * y;
  }

  divide = (x, y) => {
    return x / y;
  }

  OPERATIONS = [{
    'symbol': "+",
    "func": this.add
  }, {
    'symbol': "-",
    "func": this.subtract
  }, {
    'symbol': "*",
    "func": this.multiply
  }, {
    'symbol': "/",
    "func": this.divide
  }]

  getRandomNumber(multiplier) {
    return Math.ceil(Math.random() * parseInt(multiplier));
  }

  state = {
      firstNumber: this.getRandomNumber(10),
      secondNumber: this.getRandomNumber(10),
      operation: this.OPERATIONS[this.getRandomNumber(4) - 1],
      timeleft: this.DEFAULT_TIME,
      response: "",
      score: 0,
      questions: 0,
    };

  updateTimeLeft = () => {
    if(this.state.timeleft <= 0) {
      this.nextQuestion();
    } else {
      this.setState(oldState => ({
          timeleft: oldState.timeleft - 1
      }));
    }
  }

  componentDidMount = () => {
    setInterval(this.updateTimeLeft, this.state.timeleft * 60);
  }

  printGame = () => {
    return (
      <div>
        <h1>{this.state.firstNumber} {this.state.operation.symbol} {this.state.secondNumber}</h1>
        <input type="text" onKeyPress={this.checkResult} onChange={this.handleInput} placeholder="Please type the answer" value={this.state.response}></input>
        <h3>Score is {this.state.score} out of {this.state.questions}</h3>
        <h4>Time left: {this.state.timeleft}</h4>
      </div>
    );
  }

  handleInput = (event) => {
    this.setState(oldState => ({
      response: event.target.value
    }));
  }

  nextQuestion = () => {
    this.setState(oldState => ({
          firstNumber: this.getRandomNumber(10),
          secondNumber: this.getRandomNumber(10),
          response: "",
          questions: oldState.questions + 1,
          timeleft: this.DEFAULT_TIME
      }));
  }

  checkResult = (event) => {
    if(event.key === 'Enter') {
      let userInput = event.target.value;
      if(!isNaN(userInput)) {
        userInput = parseInt(userInput);
      } else {
        alert('Only numeric values are allowed');
        this.setState(oldState => ({
            response: "",
        }));
        return null;
      }
      let firstNumber = parseInt(this.state.firstNumber);
      let secondNumber = parseInt(this.state.secondNumber);
      let correctAnswer = null;

      correctAnswer = this.state.operation.func(firstNumber, secondNumber);

      let result = correctAnswer === userInput ? true: false;

      if(result) {
        this.setState(oldState => ({
          score: oldState.score + 1,
        }));
      }

      this.nextQuestion();
    }
  }

  handler = () => {
    return this.printGame();
  }

  render() {
      return this.handler();
  }

}

export default App;