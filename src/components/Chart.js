import React, {useState} from 'react';

const ChartP = () => {
    const [var1, setVar1] = useState(0);
    const [var2, setVar2] = useState(0);

    const [restrictions, setRestrictions] = useState(false);
    const [restData, setRestData] = useState([{
        num1: '', num2: '', sign: '', num3: ''
    }]);

    const addRestriction = () => {
        setRestData([...restData, {
            num1: '', num2: '', sign: '', num3: ''
        }])
    }

    const onChange = (idx, e) => {
        const rest = [...restData];
        rest[idx][e.target.name] = e.target.value;

        setRestData(rest);
    }

    return(
        <div className="row justify-content-center">
            <div className="col-md-10">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">Método Gráfico</h2>

                        <hr/><form>
                            <div className="form-group row justify-content-center">
                                <label className="col-sm-2 col-form-label font-weight-bold">Función Objetivo</label>

                                <label className="col-form-label font-weight-bold">X1</label>
                                <div className="col-sm-2">
                                    <input type="number" className="form-control" placeholder="Número"
                                        name={var1} onChange={e => setVar1(Number(e.target.value))}/>
                                </div>

                                <label className="col-form-label font-weight-bold mr-3">+</label>

                                <label className="col-form-label font-weight-bold">X2</label>
                                <div className="col-sm-2">
                                    <input type="number" className="form-control" placeholder="Número"
                                        name={var2} onChange={e => setVar2(Number(e.target.value))}/>
                                </div>
                            </div> <hr/>
                            
                            {restrictions === false ?
                                <button type="button" className="btn font-weight-bold text-uppercase w-100 mt-3" 
                                    style={{backgroundColor:"#FFFFFF", color:"#000000", height:"40px"}} onClick={()=>setRestrictions(true)}>Agregar Restricción</button>
                                : <div id="restrictions">
                                    <label className="col-form-label font-weight-bold">Restricciones</label>
                                    {restData.map((restriction, idx) => (
                                        <div key={idx}>
                                            <div className="form-row">
                                                <label className="col-form-label font-weight-bold">X1</label>
                                                <div className="col-sm-2">
                                                    <input type="number" className="form-control" placeholder="Número"
                                                        name="num1" value={restriction.num1} onChange={e => onChange(idx, e)}/>
                                                </div>

                                                <label className="col-form-label font-weight-bold mr-3 ml-3">+</label>

                                                <label className="col-form-label font-weight-bold">X2</label>
                                                <div className="col-sm-2">
                                                    <input type="number" className="form-control" placeholder="Número"
                                                        name="num2" value={restriction.num2} onChange={e => onChange(idx, e)}/>
                                                </div>

                                                <div className="col-sm-1">
                                                    <select className="custom-select"
                                                        name="sign" value={restriction.sign} onChange={e => onChange(idx, e)}>
                                                        <option>Signo...</option>
                                                        <option>&#60;&#61;</option> <option>&#62;&#61;</option> <option>&#61;</option> 
                                                    </select>
                                                </div>

                                                <div className="col-sm-2">
                                                    <input type="number" className="form-control" placeholder="Número"
                                                        name="num3" value={restriction.num3} onChange={e => onChange(idx, e)}/>
                                                </div>
                                            </div> <hr/>
                                        </div>
                                    ))}
                                    <button type="button" className="btn font-weight-bold text-uppercase w-100 mt-3" 
                                        style={{backgroundColor:"#FFFFFF", color:"#000000", height:"40px"}} onClick={()=>addRestriction()}>Agregar Restricción</button>
                                </div>
                            }
                            <button type="submit" className="btn font-weight-bold text-uppercase w-100 mt-3" 
                                        style={{backgroundColor:"#000000", color:"#FFFFFF", height:"40px"}}>Resolver</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChartP;