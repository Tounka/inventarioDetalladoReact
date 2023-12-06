import React from "react";
import '../hojas-de-estilo/InputID.css'

function InputID({ setNombre, setCdp }){

    return(
        <div className="contenedorInputID">
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Ingresa tu Nombre</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ramon" onChange={(e) => setNombre(e.target.value)}/>
                
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Ingresa tu CDP</label>
                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Colosio"  onChange={(e) => setCdp(e.target.value)}/>
            </div>
        </div>
        //asda cambiar id y asociar a estado
            
    );
}
export default InputID;