import React, { Component } from 'react'
import JXGBoard, { parse } from 'jsxgraph-react-js'

class Chart extends Component {
  constructor(props){
    super(props)
  }

  render () {
    const {objFunc, restData} = this.props;
    let logicJS = (board) => {
      board.suspendUpdate();
      // var x = board.create('point', [parseFloat(objFunc.x), 0]);
      // var y = board.create('point', [0, parseFloat(objFunc.y)]);
      var obj = board.create('line', [[parseFloat(objFunc.x), 0], [0, parseFloat(objFunc.y)]], {strokeColor: "#42f551"});
      
      restData.forEach(element => {
        var line = board.create("line", [-1 * parseFloat(element.c), parseFloat(element.x1), parseFloat(element.x2)], {strokeColor: "#000000"});
        board.create("inequality", [line], {inverse: element.sign === ">=" ? false : true, fillColor: "#606060"});
      });

      var restX = board.create("line", [0, 1, 0], {strokeColor: "#000000"});
      var restrictionX = board.create("inequality", [restX], {inverse: false, fillColor: "#000000"});

      var restY = board.create("line", [0, 0, 1], {strokeColor: "#000000"});
      var restrictionY = board.create("inequality", [restY], {inverse: false, fillColor: "#000000"});
    }

    return (
        <JXGBoard
          logic={logicJS}
          boardAttributes={{ axis: true, boundingbox: [-1, 11, 11, -1] }}
          style={{
            border: "3px solid black"
          }}
        />
    )
  }
}

export default Chart;