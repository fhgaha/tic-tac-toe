import React from 'react';

export function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
      style={
        { background: props.colored ? 'lightgreen' : 'transparent' }
      }
    >
      {props.value}
    </button>
  );
}
