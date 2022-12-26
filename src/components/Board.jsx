import React from 'react';
import { Square } from "./Square";

export class Board extends React.Component {
  renderSquare(i) {
    const winSquares = this.props.winSquares;
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        colored={winSquares
          && (winSquares[0] === i || winSquares[1] === i || winSquares[2] === i) ? true : false
        }
      />
    );
  }

  render() {
    const cols = [];
    const rows = [];
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 3; j++) {
        rows.push(this.renderSquare(i + j));
      }
      cols.push(
        <div key={i} className="board-row">
          {rows.slice(-3)}
        </div>
      );
    }
    return (<div>{cols}</div>);
  }
}
