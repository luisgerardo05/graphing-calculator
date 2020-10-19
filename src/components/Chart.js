import React, { Component } from 'react'
import JXGBoard from 'jsxgraph-react-js'
import Axios from 'axios';
import PropTypes from 'prop-types'

class Chart extends Component {
  constructor(props){
    super(props);
    this.state = {
      solution: {x: 0, y: 0, z: 0, type: ''},
      error: false
    };
  }

  render () {
    const {objFunc, restData} = this.props;

    let logicJS = async (board) => {
      board.suspendUpdate();
      
      restData.forEach((element) => {
        var line = board.create("line", [-1 * parseFloat(element.c), parseFloat(element.x1), parseFloat(element.x2)], {strokeColor: "#000000"});
        board.create("inequality", [line], {inverse: element.sign === ">=" ? false : true, fillColor: "#000000"});
        line.setAttribute({fixed:true});
      });

      var restX = board.create("line", [0, 1, 0], {strokeColor: "#000000"});
      var restrictionX = board.create("inequality", [restX], {inverse: false, fillColor: "#000000"});
      restX.setAttribute({fixed:true}); restrictionX.setAttribute({fixed:true});

      var restY = board.create("line", [0, 0, 1], {strokeColor: "#000000"});
      var restrictionY = board.create("inequality", [restY], {inverse: false, fillColor: "#000000"});
      restY.setAttribute({fixed:true}); restrictionY.setAttribute({fixed:true});

      const aux = restData.map((element) => {
        return{
          x: parseFloat(element.x1), y: parseFloat(element.x2), sign: element.sign, z: parseFloat(element.c)
        }
      })

      const objective = {
        x: objFunc.type === "MIN" ? parseFloat(objFunc.x) : -1 * parseFloat(objFunc.x),
        y: objFunc.type === "MIN" ? parseFloat(objFunc.y) : -1 * parseFloat(objFunc.y),
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

        let resultado = data.result;
        let xfinal = data.resultX;
        let yfinal = data.resultY;

        resultado = Math.round(100 * resultado) / 100;
        xfinal = Math.round(100 * xfinal) / 100;
        yfinal = Math.round(100 * yfinal) / 100;

        this.setState({solution: {
          x: xfinal, 
          y: yfinal, 
          type: objFunc.type,
          z: resultado
        }});

        let finalLine = board.create(
          "line",
          [-1 * resultado, parseFloat(objFunc.x), parseFloat(objFunc.y)],
          {
            strokeColor: "#42f551",
          }
        );
        finalLine.setAttribute({fixed:true});
        
        let puntoSolucion = board.create("point", [xfinal, yfinal], {name:'Punto de solucion'});
        puntoSolucion.setAttribute({fixed:true});

      } catch (error) {
        if (error.response) {
          this.setState({error: true});
        } else {
          console.log("Ocurrió un error de comunicación, intentelo de nuevo");
        }
      }

      board.unsuspendUpdate();
    }

    return (
      <div className="row justify-content-center">
        <JXGBoard
          logic={logicJS}
          boardAttributes={{ axis: true, boundingbox: [-2, 25, 25, -2], showCopyright: false}}
          style={{
            border: "3px solid black"
          }}
        />

        <div className="ml-5">
          {this.state.error 
            ? <ul className="list-group">
                <li className="list-group-item list-group-item-danger">No hay solución.</li>
              </ul>
            : <div id="solution">
                <ul className="list-group">
                  <li className="list-group-item">Región de soluciones factibles.</li>
                  <li className="list-group-item list-group-item-success">
                    Solución<br/>{this.state.solution.type} Z = {this.state.solution.z}<br/>x1 = {this.state.solution.x}<br/>x2 = {this.state.solution.y}
                  </li>
                  <li className="list-group-item list-group-item-danger">
                  Coordenadas del Punto de solución<br/>({this.state.solution.x}, {this.state.solution.y})
                  </li>
                  <li className="list-group-item list-group-item-dark">Región de soluciones no factibles.</li>
                </ul>
                <small id="solutionHelp" class="form-text text-muted">
                  <p>***Si no se logra apreciar el punto de solución se puede desplazar <br/>con los botones que están en la esquina inferior derecha de la gráfica.</p>

                  <p>
                    &#8722; &nbsp;&nbsp;&nbsp;Alejarse<br/>
                    &#8728; &nbsp;&nbsp;&nbsp;&nbsp;Regresar a gráfica original<br/>
                    &#43; &nbsp;&nbsp;&nbsp;Acercarse<br/>
                    &#8592; &nbsp;&nbsp;Desplazarse hacia la izquierda<br/>
                    &#8595; &nbsp;&nbsp;&nbsp;&nbsp;Desplazarse hacia abajo<br/>
                    &#8593; &nbsp;&nbsp;&nbsp;&nbsp;Desplazarse hacia arriba<br/>
                    &#8594; &nbsp;&nbsp;Desplazarse hacia la derecha
                  </p>
                </small>
              </div>
          }
        </div>
        
      </div>
    )
  }
}

Chart.propTypes = {
  objFunc: PropTypes.object.isRequired,
  restData: PropTypes.object.isRequired
}

export default Chart;