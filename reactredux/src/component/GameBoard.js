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
          <tbody>
            {this.props.map.map((a, y)=> {
              return <tr key={y}>{a.map((dat, x)=> {
                return <td key={x}>
                  <span>{dat.value}</span>
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
