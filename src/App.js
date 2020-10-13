import React, {useState} from 'react';
import Chart from './components/Chart';

function App() {
    const [objFunc, setObjFunc] = useState({x: '', y: '', type: ''});
    
    const [restrictions, setRestrictions] = useState(false);
    const [restData, setRestData] = useState([{
        x1: '', x2: '', sign: '', c: ''
    }]);

    const [alert, setAlert] = useState(false);
    const [counter, setCounter] = useState({value: 1});
    const [solve, setSolve] = useState(false);

    const addRestriction = () => {
        setRestData([...restData, {
            x1: '', x2: '', sign: '', c: ''
        }]);
        
        setCounter({value: counter.value+1});
    }

    const onChange = (idx, e) => {
        const rest = [...restData];
        rest[idx][e.target.name] = e.target.value;

        setRestData(rest);
    }
    
    const onSubmit = (e) => {
        e.preventDefault();

        if(objFunc.x === '' || objFunc.y === '' || objFunc.type === ''){
            setAlert(true);
            return;
        }
        setAlert(false);

        setSolve(true);
    }

    return (
        <div className="App">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4 font-weight-bold">Método Gráfico</h2>

                            <hr/><form onSubmit={onSubmit}>
                                {alert  ? <div class="alert alert-danger" role="alert">Datos faltantes</div>
                                        : null}
                                <div className="form-group row justify-content-center">

                                    <label className="col-sm-2 col-form-label font-weight-bold">Función Objetivo</label>

                                    <div className="col-sm-2">
                                        <select className="custom-select"
                                            value={objFunc.type} onChange={e => setObjFunc({...objFunc, type: e.target.value})}>
                                            <option>Objetivo...</option> <option>MIN</option> <option>MAX</option>
                                        </select>
                                    </div>

                                    <label className="col-form-label font-weight-bold mr-3">Z</label>
                                    <label className="col-form-label font-weight-bold">&#61;</label>

                                    <div className="col-sm-2">
                                        <input type="number" className="form-control" placeholder="0"
                                            value={objFunc.x} onChange={e => setObjFunc({...objFunc, x: e.target.value})}/>
                                    </div>
                                    <label className="col-form-label font-weight-bold">X1</label>

                                    <label className="col-form-label font-weight-bold ml-3">+</label>

                                    <div className="col-sm-2">
                                        <input type="number" className="form-control" placeholder="0"
                                            value={objFunc.y} onChange={e => setObjFunc({...objFunc, y: e.target.value})}/>
                                    </div>
                                    <label className="col-form-label font-weight-bold">X2</label>
                                </div> <hr/>
                                
                                {restrictions === false ?
                                    <button type="button" className="btn font-weight-bold text-uppercase w-100 mt-3" 
                                        style={{backgroundColor:"#FFFFFF", color:"#000000", height:"40px"}} onClick={()=>setRestrictions(true)}>Agregar Restricción</button>
                                    : 
                                    <div id="restrictions">
                                        <label className="col-form-label font-weight-bold">Restricciones</label>
                                        {restData.map((restriction, idx) => (
                                            <div key={idx}>
                                                <div className="form-row">
                                                    <div className="col-sm-2">
                                                        <input type="number" className="form-control" placeholder="0"
                                                            name="x1" value={restriction.x1} onChange={e => onChange(idx, e)}/>
                                                    </div>
                                                    <label className="col-form-label font-weight-bold">X1</label>

                                                    <label className="col-form-label font-weight-bold mr-2">+</label>

                                                    <div className="col-sm-2">
                                                        <input type="number" className="form-control" placeholder="0"
                                                            name="x2" value={restriction.x2} onChange={e => onChange(idx, e)}/>
                                                    </div>
                                                    <label className="col-form-label font-weight-bold">X2</label>

                                                    <div className="col-sm-1">
                                                        <select className="custom-select"
                                                            name="sign" value={restriction.sign} onChange={e => onChange(idx, e)}>
                                                            <option>Signo...</option> <option>&#60;&#61;</option> <option>&#62;&#61;</option> <option>&#61;</option> 
                                                        </select>
                                                    </div>

                                                    <div className="col-sm-2">
                                                        <input type="number" className="form-control" placeholder="0"
                                                            name="c" value={restriction.c} onChange={e => onChange(idx, e)}/>
                                                    </div>
                                                </div> <hr/>
                                            </div>
                                        ))}

                                        <label className="col-form-label font-weight-bold">X1, X2 &#62;&#61; 0</label>
                                        
                                        {counter.value <= 10 ?
                                            <button type="button" className="btn font-weight-bold text-uppercase w-100 mt-3" 
                                                style={{backgroundColor:"#FFFFFF", color:"#000000", height:"40px"}} onClick={()=>{addRestriction()}}>Agregar Restricción</button>
                                        : null}
                                        
                                    </div>
                                }
                                <button type="submit" className="btn font-weight-bold text-uppercase w-100 mt-3" 
                                    style={{backgroundColor:"#000000", color:"#FFFFFF", height:"40px"}}>Resolver</button>                            
                            </form>
                            
                        </div>
                    </div>
                </div>
                <div id="chart">
                    {solve  ? <Chart objFunc={objFunc}
                                     restData={restData}/>
                            : null}
                    
                </div>
            </div>
        </div>
    );
}

export default App;
