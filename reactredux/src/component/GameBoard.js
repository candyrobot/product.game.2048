import React, { Component } from 'react';
import './GameBoard.css';
// import $ from 'jquery';

class GameBoard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="GameBoard">
        <h1>2048</h1>
        <table>
          {this.props.map.map((a, y)=> {
            return <tr>{a.map((v, x)=> {
              return <td>{v}</td>
            })}</tr>
          })}
        </table>
      </div>
    );
  }
}

export default GameBoard;
