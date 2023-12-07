import React from "react";
import '../hojas-de-estilo/InputID.css'

function InputID({ setNombre, setCdp }){

    return(
        <div className="contenedorInputID">
            <div className="contenedorInputNombre">
                <label htmlFor="exampleInputEmail1" className="form-label txtLabelInput">Ingresa tu Nombre</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="EJEMPLO: Ramon" onChange={(e) => setNombre(e.target.value)}/>
                
            </div>
            <div className="contenedorInputCdp">
                <label htmlFor="exampleInputPassword1" className="form-label txtLabelInput">Ingresa tu CDP</label>
                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="EJEMPLO: Colosio"  onChange={(e) => setCdp(e.target.value)}/>
            </div>
        </div>
        //asda cambiar id y asociar a estado
            
    );
}
export default InputID;