import React from 'react';
import { Square } from "./Square";

export class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)} />
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
