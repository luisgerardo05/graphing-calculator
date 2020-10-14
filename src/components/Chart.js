import React, { Component } from 'react'
import JXGBoard from 'jsxgraph-react-js'
import Axios from 'axios';

class Chart extends Component {
  constructor(props){
    super(props)
  }

  render () {
    const {objFunc, restData} = this.props;

    let logicJS = async (board) => {
      board.suspendUpdate();
      var obj = board.create("line", [[parseFloat(objFunc.x), 0], [0, parseFloat(objFunc.y)]], {strokeColor: "#42f551"});
      
      restData.forEach((element) => {
        var line = board.create("line", [-1 * parseFloat(element.c), parseFloat(element.x1), parseFloat(element.x2)], {strokeColor: "#000000"});
        board.create("inequality", [line], {inverse: element.sign === ">=" ? false : true, fillColor: "#000000"})
      });

      var restX = board.create("line", [0, 1, 0], {strokeColor: "#000000"});
      var restrictionX = board.create("inequality", [restX], {inverse: false, fillColor: "#000000"});

      var restY = board.create("line", [0, 0, 1], {strokeColor: "#000000"});
      var restrictionY = board.create("inequality", [restY], {inverse: false, fillColor: "#000000"});

      const aux = restData.map((element) => {
        return{
          x: element.x1, y: element.x2, sign: element.sign, z: element.c
        }
      })

      const objective = {
        x: objFunc.type === "MIN" ? objFunc.x : -1 * objFunc.x,
        y: objFunc.type === "MIN" ? objFunc.y : -1 * objFunc.y,
      };
      const API_URL = "https://manmixserver.vercel.app";

      try {
        const { data } = await Axios.post(
          `${API_URL}`,
          {
            objective,
            equations: aux,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        /**Graficar la solucion y el punto */
        let resultado = data.result;
        let xfinal = data.resultX;
        let yfinal = data.resultY;

        /**Redondear a dos decimales */
        resultado = Math.round(100 * resultado) / 100;
        xfinal = Math.round(100 * xfinal) / 100;
        yfinal = Math.round(100 * yfinal) / 100;
        /**Linea final */
        let finalLine = board.create(
          "line",
          [-1 * resultado, objFunc.x, objFunc.y],
          {
            strokeColor: "#97266d",
          }
        );
        /**Punto de solucion */
        let puntoSolucion = board.create("point", [xfinal, yfinal]);

      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else {
          console.log("Ocurrió un error de comunicación, intentelo de nuevo");
        }
      }

      console.log(objective);
      console.log(restData);
      board.unsuspendUpdate();
    }

    return (
      <div className="row justify-content-center">
        <JXGBoard
          logic={logicJS}
          boardAttributes={{ axis: true, boundingbox: [-1, 11, 11, -1], showCopyright: false,}}
          style={{
            border: "3px solid black"
          }}
        />

        <ul class="list-group">
          <li class="list-group-item">Región de soluciones factibles</li>
          <li class="list-group-item list-group-item-success">Función objetivo</li>
          <li class="list-group-item list-group-item-danger">Solución<br/>x = <br/>y = </li>
          <li class="list-group-item list-group-item-dark">Región de soluciones no factibles</li>
        </ul>
      </div>
    )
  }
}

export default Chart;