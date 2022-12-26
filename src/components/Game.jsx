import React from 'react';
import { Toggle } from './toggleButton/toggleButton';
import { calculateWinner, getSquareColRow } from "./Helpers";
import { Board } from "./Board";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          clickedSquare: -1,
        }
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([
        {
          squares: squares,
          clickedSquare: i,
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winnerData = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const description = move
        ? `Go to move #${move} ${getSquareColRow(history[move].clickedSquare)}`
        : `Go to game start`;

      return (
        <li key={move}>
          <button
            style={{ fontWeight: this.state.stepNumber === move ? 'bold' : 'normal' }}
            onClick={() => this.jumpTo(move)}
          >
            {description}
          </button>
        </li>
      );
    });

    const status = winnerData
      ? "Winner: " + winnerData.name
      : "Next player: " + (this.state.xIsNext ? "X" : "O");

    return (
      <div className="game">
        <div className="game-board">
          <Board
            winSquares={winnerData ? winnerData.squares : null}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{this.state.descending ? moves.reverse() : moves}</ol>
          <Toggle
            label="Sort By Decending"
            toggled={false}
            onClick={() => this.setState({ descending: !this.state.descending })}
          />
        </div>
      </div>
    );
  }
}
