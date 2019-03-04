import React, { Component } from 'react';
import './GameBoard.css';
import Emoji from '../object/Emoji';
// import $ from 'jquery';

class GameBoard extends Component {
  render() {
    return (
      <div className="GameBoard">
        <h1>2048</h1>
        <table>
          <tbody>
            {this.props.map.map((a, y)=> {
              return <tr key={y} data-y={y}>{a.map((dat, x)=> {
                return <td key={x} data-x={x}>
                  <div>{dat.value ? Emoji.html(dat.value) : ''}</div>
                </td>
              })}</tr>
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default GameBoard;
