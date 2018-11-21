import React, { Component } from 'react';
import './GameBoard.css';
// import $ from 'jquery';

class GameBoard extends Component {
  render() {
    return (
      <div className="GameBoard">
        <h1>2048</h1>
        <table>
          <tbody>
            {this.props.map.map((a, y)=> {
              return <tr key={y}>{a.map((v, x)=> {
                return <td key={x}>
                  <span>{v}</span>
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
