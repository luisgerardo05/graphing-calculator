import React, {useState} from 'react';

const ChartP = () => {
    const [var1, setVar1] = useState(0);
    const [var2, setVar2] = useState(0);

    
    const onSubmit = e => {

    }
    return(
        <div className="row justify-content-center">
            <div className="col-md-10">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">Método Gráfico</h2>

                        <hr/><form onSubmit={onSubmit}>
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

                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default ChartP;